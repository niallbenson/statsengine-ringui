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
      then(res => res.json()).
      then(data => this.setState({data}, () => this.displayGrids()));
  }

  displayGrids() {
    const {gridSize, data} = this.state;
    const {scaleBand, select, axisBottom, axisLeft, scaleLinear} = d3;
    const {width, height} = this.props;

    console.log('data', data);

    const pitchHeightInM = 80.0;
    const pitchWidthInM = 120.0;

    const rowsCount = pitchHeightInM / gridSize;
    const rows = Array.from({length: rowsCount}, Number.call, i => i + 1);

    const colsCount = pitchWidthInM / gridSize;
    const cols = Array.from({length: colsCount}, Number.call, i => i + 1);

    const svg = select(this.ref.current);

    const x = scaleBand().
      range([0, width]).
      domain(cols).
      padding(0.01);

    svg.append('g').
      attr('transform', `translate(0,${height})`).
      call(axisBottom(x));

    const y = scaleBand().
      range([0, height]).
      domain(rows).
      padding(0.01);

    svg.append('g').
      call(axisLeft(y));

    const colorScale = scaleLinear().
      range(['white', '#69b3a2']).
      domain([1, 10]);

    svg.selectAll().
      data(data, d => d.x + ':' + d.y).
      enter().
      append('rect').
      attr('x', d => x(d.x)).
      attr('y', d => y(d.y)).
      attr('width', x.bandwidth()).
      attr('height', y.bandwidth()).
      style('fill', d => colorScale(d.value));
  }

  render() {
    return <div/>;
  }
}
