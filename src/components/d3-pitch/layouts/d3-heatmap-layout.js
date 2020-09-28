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
    gridSize: 10, // start grid size at 1m x 1m
    data: undefined
  };

  componentDidMount() {
    this.loadPage();
  }

  loadPage() {
    const {matchId, playerId} = this.props;
    const {gridSize} = this.state;

    fetch(`http://localhost:8080/api/heatmap/match/${matchId}/player/${playerId}/grid/${gridSize}`).
      then(res => res.json()).
      then(data => this.setState({data}, () => this.displayGridCells()));
  }

  displayGridCells() {
    const {gridSize, data} = this.state;
    const {scaleBand, select, scaleLinear} = d3;
    const {width, height} = this.props;

    const pitchHeightInM = 80.0;
    const pitchWidthInM = 120.0;

    const rowsCount = pitchHeightInM / gridSize;
    const rows = Array.from(
      {length: rowsCount}, Number.call, i => i * gridSize);

    const colsCount = pitchWidthInM / gridSize;
    const cols = Array.from(
      {length: colsCount}, Number.call, i => i * gridSize);

    const svg = select(this.ref.current);

    const x = scaleBand().
      range([0, width]).
      domain(cols).
      padding(0.01);

    const y = scaleBand().
      range([0, height]).
      domain(rows).
      padding(0.01);

    const maxValue = Math.max(...data.map(i => i.value));

    const colorScale = scaleLinear().
      range(['yellow', 'red']).
      domain([1, maxValue]);

    const gridOpacity = 0.7;

    svg.selectAll().
      data(data, d => `${d.x}:${d.y}`).
      enter().
      append('rect').
      attr('x', d => x(d.x)).
      attr('y', d => y(d.y)).
      attr('width', x.bandwidth()).
      attr('height', y.bandwidth()).
      attr('opacity', gridOpacity).
      style('fill', d => colorScale(d.value));
  }

  render() {
    return <g ref={this.ref}/>;
  }
}
