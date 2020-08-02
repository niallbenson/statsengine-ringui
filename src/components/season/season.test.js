import React from 'react';
import {shallow, mount} from 'enzyme';

import Season from './season';

describe('Season', () => {
  const shallowSeason = props => shallow(<Season {...props}/>);
  const mountSeason = props => mount(<Season {...props}/>);

  it('should create component', () => {
    mountSeason().should.have.type(Season);
  });

  it('should wrap children with div', () => {
    shallowSeason().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowSeason({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
