import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';

import {DisplayType} from './enums/display-type';
import D3PitchLayout from './layouts/d3-pitch-layout';
import D3StartingLineupLayout from './layouts/d3-starting-lineup-layout';
import D3HeatmapLayout from "./layouts/d3-heatmap-layout";

export default class D3Pitch extends PureComponent {

  static propTypes = {
    displayType: PropTypes.number.isRequired,
    matchId: PropTypes.number.isRequired,
    selectedPlayerId: PropTypes.number,
    playerClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
  }

  state = {
    displayType: undefined,
    svgHeight: 450,
    svgWidth: 700,
    matchId: undefined,
    selectedPlayerId: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {displayType, selectedPlayerId} = nextProps;

    if (displayType !== prevState.displayType ||
      selectedPlayerId !== prevState.selectedPlayerId) {

      return {displayType, selectedPlayerId};
    }

    return null;
  }

  getDisplay() {
    const {svgHeight, svgWidth, displayType, selectedPlayerId} = this.state;
    const {matchId, playerClick} = this.props;

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
        />
      );
    }
    return null;
  }

  render() {
    const {svgHeight, svgWidth, displayType} = this.state;

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
