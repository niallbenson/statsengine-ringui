import React from 'react';
import {shallow, mount} from 'enzyme';

import HeaderContainer from './header-container';

describe('Header Container', () => {
  const shallowHeaderContainer = props => shallow(<HeaderContainer {...props}/>);
  const mountHeaderContainer = props => mount(<HeaderContainer {...props}/>);

  it('should create component', () => {
    mountHeaderContainer().should.have.type(HeaderContainer);
  });

  it('should wrap children with div', () => {
    shallowHeaderContainer().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowHeaderContainer({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
