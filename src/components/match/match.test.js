import React from 'react';
import {shallow, mount} from 'enzyme';

import Match from './match';

describe('Match', () => {
  const shallowMatch = props => shallow(<Match {...props}/>);
  const mountMatch = props => mount(<Match {...props}/>);

  it('should create component', () => {
    mountMatch().should.have.type(Match);
  });

  it('should wrap children with div', () => {
    shallowMatch().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowMatch({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
