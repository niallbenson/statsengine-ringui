import React from 'react';
import {shallow, mount} from 'enzyme';

import Matches from './matches';

describe('Matches', () => {
  const shallowMatches = props => shallow(<Matches {...props}/>);
  const mountMatches = props => mount(<Matches {...props}/>);

  it('should create component', () => {
    mountMatches().should.have.type(Matches);
  });

  it('should wrap children with div', () => {
    shallowMatches().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowMatches({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
