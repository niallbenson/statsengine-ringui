import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as d3 from 'd3';

import styles from './d3-pitch.css';
import D3PitchLayout from './commands/d3-pitch-layout';
import { select } from 'd3';

export default class D3Pitch extends PureComponent {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
  }

  svgHeight = 400;
  svgWidth = 700;

  render() {
    const { className } = this.props;
    const classes = classNames(styles.d3Pitch, className);

    return (
      <svg height={this.svgHeight} width={this.svgWidth}>
        <D3PitchLayout height={this.svgHeight} width={this.svgWidth} />
      </svg>
    );
  }
}
