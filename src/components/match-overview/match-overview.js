import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';

import {DisplayType} from '../d3-pitch/enums/display-type';
import D3Pitch from '../d3-pitch/d3-pitch';

// eslint-disable-next-line no-unused-vars
import styles from './match-overview.css';

const className = 'matchOverview';

export default class MatchOverview extends PureComponent {

  static propTypes = {
    matchId: PropTypes.number
  };

  state = {
    matchId: undefined,
    d3DisplayType: undefined,
    selectedPlayerId: undefined
  };

  static getDerivedStateFromProps(nextProps) {
    const {matchId} = nextProps;

    return {matchId, d3DisplayType: DisplayType.STARTING_LINEUP};
  }

  playerClickEvent = id => {
    this.setState({
      selectedPlayerId: id,
      d3DisplayType: DisplayType.PLAYER_HEATMAP
    });
  }

  render() {
    if (this.state.matchId === undefined) {
      return <div/>;
    }

    return (
      <div className={className}>
        <D3Pitch
          matchId={this.state.matchId}
          displayType={this.state.d3DisplayType}
          playerClick={this.playerClickEvent}
        />
      </div>
    );
  }
}
