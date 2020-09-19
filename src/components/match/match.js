import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Text from '@jetbrains/ring-ui/components/text/text';
import { Tab, SmartTabs } from '@jetbrains/ring-ui/components/tabs/tabs';
import Heading, { H1, H2, H3, H4 } from '@jetbrains/ring-ui/components/heading/heading';

import styles from './match.css';
import { Link } from 'react-router-dom';
import D3Pitch from '../d3-pitch/d3-pitch';
import MatchEvents from '../match-events/match-events';
import MatchOverview from '../match-overview/match-overview';

export default class Match extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    matchId: undefined,
    match: undefined,
    homeGoals: undefined,
    awayGoals: undefined
  }

  componentDidMount = () => {
    this.setState({
      matchId: this.props.match.params.id
    }, () => this.loadPage());
  }

  loadPage = () => {
    fetch('http://localhost:8080/api/match/' + this.state.matchId)
      .then(res => res.json())
      .then(data => this.setState({ match: data }))
      .catch(console.log);
  }

  getPlayerName(player) {
    return player.nickName ? player.nickName : player.name;
  }

  render() {
    const { className, ...restProps } = this.props;
    const classes = classNames(styles.match, className);

    const { match, homeGoals, awayGoals } = this.state;

    if (!match) return (<div></div>);

    const score = match.homeTeamName + ' ' + match.homeScore + ' - ' + match.awayScore + ' ' + match.awayTeamName;
    const matchDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
      .format(new Date(match.matchDate));

    return (
      <div className={classes}>

        <Link to={'/competition/' + match.competitionId} className="competition-link">{match.competitionName}</Link>
        <H2 className="score-header">{score}</H2>
        <Text info>{matchDate}</Text>
        <div id="match-tabs">
          <SmartTabs>
            <Tab title="Overview">
              <MatchOverview matchId={this.state.matchId} />
            </Tab>

            <Tab title="Events">
              <MatchEvents matchId={this.state.matchId} />
            </Tab>

            <Tab title="Line ups">
              
            </Tab>
          </SmartTabs>
        </div>

      </div>
    );
  }
}
