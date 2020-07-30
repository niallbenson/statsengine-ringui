import React from 'react';
import {shallow, mount} from 'enzyme';

import Home from './home';

describe('Home', () => {
  const shallowHome = props => shallow(<Home {...props}/>);
  const mountHome = props => mount(<Home {...props}/>);

  it('should create component', () => {
    mountHome().should.have.type(Home);
  });

  it('should wrap children with div', () => {
    shallowHome().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowHome({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
