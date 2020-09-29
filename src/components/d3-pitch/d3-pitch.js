import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';

import {DisplayType} from './enums/display-type';
import D3PitchLayout from './layouts/d3-pitch-layout';
import D3StartingLineupLayout from './layouts/d3-starting-lineup-layout';
import D3HeatmapLayout from './layouts/d3-heatmap-layout';

export default class D3Pitch extends PureComponent {

  static propTypes = {
    displayType: PropTypes.number.isRequired,
    matchId: PropTypes.number.isRequired,
    selectedPlayerId: PropTypes.number,
    playerClick: PropTypes.func.isRequired,
    gridSize: PropTypes.number.isRequired,
    svgHeight: PropTypes.number.isRequired,
    svgWidth: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
  }

  state = {
    displayType: undefined,
    matchId: undefined,
    selectedPlayerId: undefined,
    gridSize: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {displayType, selectedPlayerId, gridSize} = nextProps;

    if (displayType !== prevState.displayType ||
      selectedPlayerId !== prevState.selectedPlayerId ||
      gridSize !== prevState.gridSize) {

      return {displayType, selectedPlayerId, gridSize};
    }

    return null;
  }

  getDisplay() {
    const {displayType, selectedPlayerId, gridSize} = this.state;
    const {matchId, playerClick, svgHeight, svgWidth} = this.props;

    if (this.state.displayType === DisplayType.STARTING_LINEUP) {
      return (
        <D3StartingLineupLayout
          height={svgHeight}
          width={svgWidth}
          matchId={matchId}
          playerClick={playerClick}
        />
      );
    } else if (displayType === DisplayType.EVENT) {
      return <div>{'Event'}</div>;
    } else if (displayType === DisplayType.PLAYER_HEATMAP) {
      return (
        <D3HeatmapLayout
          height={svgHeight}
          width={svgWidth}
          matchId={matchId}
          playerId={selectedPlayerId}
          gridSize={gridSize}
        />
      );
    }
    return null;
  }

  render() {
    const {displayType} = this.state;
    const {svgHeight, svgWidth} = this.props;

    if (displayType === undefined) {
      return <div/>;
    }

    const display = this.getDisplay();

    return (
      <svg height={svgHeight} width={svgWidth}>
        <D3PitchLayout
          height={svgHeight}
          width={svgWidth}
        />
        {display}
      </svg>
    );
  }

}
