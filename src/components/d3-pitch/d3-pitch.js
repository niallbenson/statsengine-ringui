import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as d3 from 'd3';

import { DisplayType } from './enums/display-type';
import styles from './d3-pitch.css';
import D3PitchLayout from './layouts/d3-pitch-layout';
import { select } from 'd3';
import D3StartingLineupLayout from './layouts/d3-starting-lineup-layout';

export default class D3Pitch extends PureComponent {

  state = {
    displayType: undefined,
    svgHeight: 450,
    svgWidth: 700,
    matchId: undefined,
    selectedPlayerId: undefined
  };

  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      displayType: this.props.displayType,
      matchId: this.props.matchId
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.displayType !== prevState.displayType
      || this.props.selectedPlayerId !== prevState.selectedPlayerId) {

      this.setState({
        displayType: this.props.displayType,
        selectedPlayerId: this.props.selectedPlayerId
      });
    }
  }

  getDisplay() {
    if (this.state.displayType === DisplayType.STARTING_LINEUP) {
      return <D3StartingLineupLayout
        height={this.state.svgHeight}
        width={this.state.svgWidth}
        matchId={this.state.matchId}
        playerClick={this.props.playerClick}
      />;
    }
    else if (this.state.displayType === DisplayType.EVENT) {
      return <div>Event</div>;
    }
    else if (this.state.displayType === DisplayType.PLAYER_HEATMAP) {
      return <div>Player heatmap to be displayed for {this.state.selectedPlayerId}</div>
    }
    return null;
  }

  render() {
    if (this.state.displayType === undefined) return <div></div>;

    const display = this.getDisplay(display);

    return (
      <svg height={this.state.svgHeight} width={this.state.svgWidth}>
        <D3PitchLayout height={this.state.svgHeight} width={this.state.svgWidth} />
        {display}
      </svg>
    );
  }

}
