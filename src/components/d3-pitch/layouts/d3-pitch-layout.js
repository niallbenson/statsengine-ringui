import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import * as d3 from 'd3';

export default class D3PitchLayout extends PureComponent {
  state = {
    height: undefined,
    width: undefined,
    grassColor: '#62B200'
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setState({
      height: this.props.height,
      width: this.props.width
    }, () => {
      this.drawPitchRect();
      this.drawPitchMarkings();
    });
  }

  drawPitchRect() {
    d3.select(this.ref.current)
      .append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', this.state.grassColor);
  }

  drawPitchMarkings() {
    // Outside markings & half way line
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.5)},${this.y(0.02778)} L ${this.x(0.04348)},${this.y(0.02778)} ${this.x(0.04348)},${this.y(0.9722)} ${this.x(0.9566)},
      ${this.y(0.9722)} ${this.x(0.9566)},${this.y(0.02778)} ${this.x(0.5)},${this.y(0.02778)} ${this.x(0.5)},${this.y(0.9722)} z`
    );

    // Box behind left hand goal
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.0435)},${this.y(0.4506)} L ${this.x(0.0348)},${this.y(0.4506)} ${this.x(0.0348)},${this.y(0.5508)} ${this.x(0.0435)},${this.y(0.5508)} z`
    );

    // Box behind right hand goal
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.9566)},${this.y(0.4506)} L ${this.x(0.9652)},${this.y(0.4506)} ${this.x(0.9652)},${this.y(0.5508)} ${this.x(0.9565)},${this.y(0.5508)} z`
    );

    // Left hand goal area
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.0435)},${this.y(0.3742)} L ${this.x(0.0913)},${this.y(0.3742)} ${this.x(0.0913)},${this.y(0.6272)} ${this.x(0.0435)},${this.y(0.6272)} z`
    );

    // Right hand goal area
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.9565)},${this.y(0.3742)} L ${this.x(0.9087)},${this.y(0.3742)} ${this.x(0.9087)},${this.y(0.6272)} ${this.x(0.9565)},${this.y(0.6272)} z`
    );

    // Left hand penalty area
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.0435)},${this.y(0.2214)} L ${this.x(0.187)},${this.y(0.2214)} ${this.x(0.187)},${this.y(0.78)} ${this.x(0.0435)},${this.y(0.78)} z`
    );

    // Right hand penalty area
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.9565)},${this.y(0.2214)} L ${this.x(0.813)},${this.y(0.2214)} ${this.x(0.813)},${this.y(0.78)} ${this.x(0.9565)},${this.y(0.78)} z`
    );

    // Left hand penalty arc
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.187)},${this.y(0.3984)} A ${this.x(0.0796)},${this.y(0.1271)} 0 0,1 ${this.x(0.187)},${this.y(0.6016)} z`
    );

    // Right hand penalty arc
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.813)},${this.y(0.3984)} A ${this.x(0.0796)},${this.y(0.1271)} 0 0,0 ${this.x(0.813)},${this.y(0.6016)} z`
    );

    // Top left corner arc
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.0435)},${this.y(0.0417)} A ${this.x(0.0087)},${this.y(0.0139)} 0 0,0 ${this.x(0.0522)},${this.y(0.0278)} L ${this.x(0.0435)},${this.y(0.0278)} z`
    );

    // Bottom left corner arc
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.0522)},${this.y(0.9722)} A ${this.x(0.0087)},${this.y(0.0139)} 0 0,0 ${this.x(0.0435)},${this.y(0.9583)} L ${this.x(0.0435)},${this.y(0.9722)} z`
    );

    // Bottom right corner arc
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.9565)},${this.y(0.9583)} A ${this.x(0.0087)},${this.y(0.0139)} 0 0,0 ${this.x(0.9478)},${this.y(0.9722)} L ${this.x(0.9565)},${this.y(0.9722)} z`
    );

    // Top right corner arc
    this.drawPathWithWhiteLineNoFill(
      `M ${this.x(0.9478)},${this.y(0.0278)} A ${this.x(0.0087)},${this.y(0.0139)} 0 0,0 ${this.x(0.9565)},${this.y(0.0417)} L ${this.x(0.9565)},${this.y(0.0278)} z`
    );

    this.drawCircleWithWhiteLineNoFill(this.x(0.5), this.y(0.5), this.x(0.0796));

    this.drawCircleWithWhiteLineWhiteFill(this.x(0.5), this.y(0.5), 2);
    this.drawCircleWithWhiteLineWhiteFill(this.x(0.1391), this.y(0.5), 2);
    this.drawCircleWithWhiteLineWhiteFill(this.x(0.8609), this.y(0.5), 2);
  }

  x(pos) {
    return this.state.width * pos;
  }

  y(pos) {
    return this.state.height * pos;
  }

  drawPathWithWhiteLineNoFill(path) {
    return d3.select(this.ref.current)
      .append('path')
      .attr('d', path)
      .attr('stroke', 'white')
      .attr('stroke-width', '1.5')
      .attr('fill-opacity', 0);
  }

  drawCircleWithWhiteLineNoFill(x, y, radius) {
    const circle = this.drawCircleWithWhiteLine(x, y, radius);

    circle.attr('fill-opacity', 0);
  }

  drawCircleWithWhiteLineWhiteFill(x, y, radius) {
    const circle = this.drawCircleWithWhiteLine(x, y, radius);

    circle.attr('fill', 'white');
  }

  drawCircleWithWhiteLine(x, y, radius) {
    return d3.select(this.ref.current)
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', radius)
      .attr('stroke', 'white')
      .attr('stroke-width', '1.5');
  }

  render() {
    if (this.state.height === undefined || this.state.width === undefined) return <div></div>;

    return <g ref={this.ref} />;
  }
}
