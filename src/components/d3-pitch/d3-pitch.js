import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';

import {DisplayType} from './enums/display-type';
import D3PitchLayout from './layouts/d3-pitch-layout';
import D3StartingLineupLayout from './layouts/d3-starting-lineup-layout';

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
    if (this.state.displayType === DisplayType.STARTING_LINEUP) {
      return (
        <D3StartingLineupLayout
          height={this.state.svgHeight}
          width={this.state.svgWidth}
          matchId={this.props.matchId}
          playerClick={this.props.playerClick}
        />
      );
    } else if (this.state.displayType === DisplayType.EVENT) {
      return <div>{'Event'}</div>;
    } else if (this.state.displayType === DisplayType.PLAYER_HEATMAP) {
      return (
        <div>
          {`Player heatmap to be displayed for ${this.state.selectedPlayerId}`}
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.state.displayType === undefined) {
      return <div/>;
    }

    const display = this.getDisplay();

    return (
      <svg height={this.state.svgHeight} width={this.state.svgWidth}>
        <D3PitchLayout
          height={this.state.svgHeight}
          width={this.state.svgWidth}
        />
        {display}
      </svg>
    );
  }

}
