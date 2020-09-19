import React from 'react';
import {shallow, mount} from 'enzyme';

import MatchOverview from './match-overview';

describe('Match Overview', () => {
  const shallowMatchOverview = props => shallow(<MatchOverview {...props}/>);
  const mountMatchOverview = props => mount(<MatchOverview {...props}/>);

  it('should create component', () => {
    mountMatchOverview().should.have.type(MatchOverview);
  });

  it('should wrap children with div', () => {
    shallowMatchOverview().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowMatchOverview({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
