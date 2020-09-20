import React, {PureComponent} from 'react';
import {Slider} from 'rsuite';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import styles from './event-significance-slider.css';

export default class EventSignificanceSlider extends PureComponent {

  static propTypes = {
    startValue: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired
  }

  render() {
    const labels = ['GOALS', 'KEY EVENTS', 'ALL EVENTS'];

    const {startValue, change} = this.props;

    return (
      <div className="event-significance-slider">
        <div style={{width: 350, marginLeft: 20}}>
          <Slider
            defaultValue={startValue}
            min={0}
            step={1}
            max={2}
            graduated
            progress
            renderMark={mark => labels[mark]}
            tooltip={false}
            onChange={value => change(value)}
          />
        </div>
      </div>
    );
  }
}
