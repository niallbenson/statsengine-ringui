import React from 'react';
import {shallow, mount} from 'enzyme';

import MatchEvents from './match-events';

describe('Match-Events', () => {
  const shallowMatchEvents = props => shallow(<MatchEvents {...props}/>);
  const mountMatchEvents = props => mount(<MatchEvents {...props}/>);

  it('should create component', () => {
    mountMatchEvents().should.have.type(MatchEvents);
  });

  it('should wrap children with div', () => {
    shallowMatchEvents().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowMatchEvents({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
