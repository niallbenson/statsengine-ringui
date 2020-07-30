import React from 'react';
import {shallow, mount} from 'enzyme';

import Competitions from './competitions';

describe('Competitions', () => {
  const shallowCompetitions = props => shallow(<Competitions {...props}/>);
  const mountCompetitions = props => mount(<Competitions {...props}/>);

  it('should create component', () => {
    mountCompetitions().should.have.type(Competitions);
  });

  it('should wrap children with div', () => {
    shallowCompetitions().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowCompetitions({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
