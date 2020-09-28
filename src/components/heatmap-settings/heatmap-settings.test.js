import React from 'react';
import {shallow, mount} from 'enzyme';

import HeatmapSettings from './heatmap-settings';

describe('Heatmap-Settings', () => {
  const shallowHeatmapSettings = props => shallow(<HeatmapSettings {...props}/>);
  const mountHeatmapSettings = props => mount(<HeatmapSettings {...props}/>);

  it('should create component', () => {
    mountHeatmapSettings().should.have.type(HeatmapSettings);
  });

  it('should wrap children with div', () => {
    shallowHeatmapSettings().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowHeatmapSettings({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
