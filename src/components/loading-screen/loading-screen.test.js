import React from 'react';
import {shallow, mount} from 'enzyme';

import LoadingScreen from './loading-screen';

describe('Loading Screen', () => {
  const shallowLoadingScreen = props => shallow(<LoadingScreen {...props}/>);
  const mountLoadingScreen = props => mount(<LoadingScreen {...props}/>);

  it('should create component', () => {
    mountLoadingScreen().should.have.type(LoadingScreen);
  });

  it('should wrap children with div', () => {
    shallowLoadingScreen().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowLoadingScreen({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
