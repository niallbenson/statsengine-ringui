import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Text from '@jetbrains/ring-ui/components/text/text';
import {SmartTabs, Tab} from '@jetbrains/ring-ui/components/tabs/tabs';
import {H2} from '@jetbrains/ring-ui/components/heading/heading';

import {Link} from 'react-router-dom';

import MatchEvents from '../match-events/match-events';
import MatchOverview from '../match-overview/match-overview';

// eslint-disable-next-line no-unused-vars
import styles from './match.css';

const className = 'match';

export default class Match extends PureComponent {
  static propTypes = {
    match: PropTypes.object
  };

  state = {
    matchId: undefined,
    match: undefined,
    homeGoals: undefined,
    awayGoals: undefined
  }

  static getDerivedStateFromProps(nextProps) {
    const {id} = nextProps.match.params;

    return {matchId: Number(id)};
  }

  componentDidMount = () => {
    this.loadPage();
  }

  loadPage = () => {
    fetch(`http://localhost:8080/api/match/${this.state.matchId}`).
      then(res => res.json()).
      then(data => this.setState({match: data}));
  }

  getPlayerName(player) {
    const {nickName, name} = player;

    return nickName ? nickName : name;
  }

  render() {
    const {match} = this.state;

    if (!match) {
      return <div/>;
    }

    const {
      homeTeamName, homeScore, awayTeamName, awayScore, matchDate,
      competitionId, competitionName
    } = match;

    if (!match) {
      return (<div/>);
    }

    const score = `${homeTeamName} ${homeScore} - ${awayScore} ${awayTeamName}`;
    const formattedMatchDate = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(matchDate));

    return (
      <div className={className}>

        <Link
          to={`/competition/${competitionId}`}
          className="competition-link"
        >
          {competitionName}
        </Link>
        <H2 className="score-header">{score}</H2>
        <Text info>{formattedMatchDate}</Text>
        <div id="match-tabs">
          <SmartTabs>
            <Tab title="Overview">
              <MatchOverview matchId={this.state.matchId}/>
            </Tab>

            <Tab title="Events">
              <MatchEvents matchId={this.state.matchId}/>
            </Tab>

            <Tab title="Line ups"/>
          </SmartTabs>
        </div>

      </div>
    );
  }
}
