import React from 'react';
import {shallow, mount} from 'enzyme';

import Competition from './competition';

describe('Competition', () => {
  const shallowCompetition = props => shallow(<Competition {...props}/>);
  const mountCompetition = props => mount(<Competition {...props}/>);

  it('should create component', () => {
    mountCompetition().should.have.type(Competition);
  });

  it('should wrap children with div', () => {
    shallowCompetition().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowCompetition({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
