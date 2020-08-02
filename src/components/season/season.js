import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './season.css';
import Matches from '../matches/matches';

export default class Season extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    competition: undefined,
    season: undefined,
    matches: undefined
  }

  static getDerivedStateFromProps(props, state) {
    state.competition = props.competition;
    state.season = props.season;

    return state;
  }

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.season.id !== prevProps.season.id) {
      this.loadPage();
    }
  }

  loadPage = () => {
    fetch('http://localhost:8080/api/match/competition/' + this.state.competition.id + '/season/' + this.state.season.id)
      .then(res => res.json())
      .then(data => {
        this.setState({ matches: data });
      })
      .catch(console.log);
  }

  render() {
    if (!this.state.season) return (<div></div>);

    const { className, competition, season, ...restProps } = this.props;
    const classes = classNames(styles.season, className);

    const matches = !this.state.matches ? null
      : <Matches matches={this.state.matches} className="matches" />;

    return (
      <div className={classes}>
        {matches}
      </div>
    );
  }
}
