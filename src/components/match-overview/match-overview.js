import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';

import {DisplayType} from '../d3-pitch/enums/display-type';
import D3Pitch from '../d3-pitch/d3-pitch';

import HeatmapSettings from '../heatmap-settings/heatmap-settings';

// eslint-disable-next-line no-unused-vars
import styles from './match-overview.css';

const className = 'matchOverview';

export default class MatchOverview extends PureComponent {

  static propTypes = {
    matchId: PropTypes.number
  };

  state = {
    matchId: undefined,
    d3DisplayType: DisplayType.STARTING_LINEUP,
    selectedPlayerId: undefined
  };

  static getDerivedStateFromProps(nextProps) {
    const {matchId} = nextProps;

    return {matchId};
  }

  playerClickEvent = id => {
    this.setState({
      selectedPlayerId: id,
      d3DisplayType: DisplayType.PLAYER_HEATMAP
    });
  };

  getHeatmapSettings() {
    const {selectedPlayerId, d3DisplayType} = this.state;

    if (d3DisplayType !== DisplayType.PLAYER_HEATMAP || !selectedPlayerId) {
      return null;
    }

    return (
      <HeatmapSettings

      />
    );
  }

  render() {
    if (this.state.matchId === undefined) {
      return <div/>;
    }

    const {matchId, d3DisplayType, selectedPlayerId} = this.state;

    return (
      <div className={className}>
        <D3Pitch
          matchId={matchId}
          displayType={d3DisplayType}
          playerClick={this.playerClickEvent}
          selectedPlayerId={selectedPlayerId}
        />
        {this.getHeatmapSettings()}
      </div>
    );
  }
}
