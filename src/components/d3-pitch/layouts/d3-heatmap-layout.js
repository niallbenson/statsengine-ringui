import React, {PureComponent} from 'react';

import PropType from 'prop-types';

import * as d3 from 'd3';

import getPitchAbsoluteXY from '../calcs/pitch-absolute-xy';
import getPlayerDisplayLastName from '../calcs/player-display-name';

export default class D3HeatmapLayout extends PureComponent {

  static propTypes = {
    matchId: PropType.number.isRequired,
    playerId: PropType.number.isRequired,
    height: PropType.number.isRequired,
    width: PropType.number.isRequired
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  state = {
    gridSize: 1, // start grid size at 1m x 1m
    data: undefined
  };

  componentDidMount() {
    this.loadPage();
  }

  loadPage() {
    const {matchId, playerId} = this.props;
    const {gridSize} = this.state;

    fetch(`http://localhost:8080/api/heatmap/match/${matchId}/player/${playerId}/grid/${gridSize}`).
      then(res => res.json).
      then(data => this.setState({data}, () => this.displayGrids()));
  }

  displayGrids() {
    const pitchHeightInM = 80.0;
    const pitchWidthInM = 120.0;

    const {gridSize} = this.state;

    const rowsCount = pitchHeightInM / gridSize;
    const colsCount = pitchWidthInM / gridSize;

    const rows = Array.from({length: rowsCount}, Number.call, i => i + 1);
    const cols = Array.from({length: colsCount}, Number.call, i => i + 1);

    const {scaleBand, select} = d3;

    const {width, height} = this.props;

    const x = scaleBand().
      range([0, width]).
      domain(cols).
      padding(0.05);

    const y = scaleBand().
      range([0, height]).
      domain(rows).
      padding(0.05);

    const svg = select(this.ref.current);

    svg.selectAll().
      data();
  }

  render() {
    return <div />;
  }
}
