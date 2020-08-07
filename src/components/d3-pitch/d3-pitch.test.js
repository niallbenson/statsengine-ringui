import React from 'react';
import {shallow, mount} from 'enzyme';

import D3Pitch from './d3-pitch';

describe('D3 Pitch', () => {
  const shallowD3Pitch = props => shallow(<D3Pitch {...props}/>);
  const mountD3Pitch = props => mount(<D3Pitch {...props}/>);

  it('should create component', () => {
    mountD3Pitch().should.have.type(D3Pitch);
  });

  it('should wrap children with div', () => {
    shallowD3Pitch().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowD3Pitch({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
