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
    selectedPlayerId: undefined,
    gridSize: 5,
    svgHeight: 450,
    svgWidth: 700,
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

  clearHeatmap = () => {
    this.setState({
      selectedPlayerId: undefined,
      d3DisplayType: DisplayType.STARTING_LINEUP
    });
  };

  onGridSizeChange = gridSize => {
    this.setState({gridSize});
  };

  getHeatmapSettings() {
    const {
      matchId, selectedPlayerId, d3DisplayType, gridSize, svgWidth
    } = this.state;

    if (d3DisplayType !== DisplayType.PLAYER_HEATMAP || !selectedPlayerId) {
      return null;
    }

    return (
      <HeatmapSettings
        matchId={matchId}
        playerId={selectedPlayerId}
        clearHeatmap={this.clearHeatmap}
        gridSize={gridSize}
        onGridSizeChange={this.onGridSizeChange}
        heatmapWidth={svgWidth}
      />
    );
  }

  render() {
    if (this.state.matchId === undefined) {
      return <div/>;
    }

    const {
      matchId, d3DisplayType, selectedPlayerId, gridSize, svgHeight, svgWidth
    } = this.state;

    return (
      <div className={className}>
        <D3Pitch
          matchId={matchId}
          displayType={d3DisplayType}
          playerClick={this.playerClickEvent}
          selectedPlayerId={selectedPlayerId}
          gridSize={gridSize}
          svgWidth={svgWidth}
          svgHeight={svgHeight}
        />
        {this.getHeatmapSettings()}
      </div>
    );
  }
}
