import React, { PureComponent } from 'react';
import { Slider } from 'rsuite';

import styles from './event-significance-slider.css';

export default class EventSignificanceSlider extends React.PureComponent {

  render() {
    const labels = ['GOALS', 'KEY EVENTS', 'ALL EVENTS'];

    const handleStyle = {
      color: '#fff',
      fontSize: 12,
      width: 32,
      height: 22
    };

    const { startValue, change } = this.props;

    return (
      <div className='event-significance-slider'>
        <div style={{ width: 350, marginLeft: 20 }}>
          <Slider
            defaultValue={startValue}
            min={0}
            step={1}
            max={2}
            graduated={true}
            progress={true}
            renderMark={mark => labels[mark]}
            tooltip={false}
            onChange={value => change(value)}
          />
        </div>
      </div>
    );
  }
}