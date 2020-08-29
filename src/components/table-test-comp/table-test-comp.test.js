import React from 'react';
import {shallow, mount} from 'enzyme';

import TableTestComp from './table-test-comp';

describe('Table-Test-Comp', () => {
  const shallowTableTestComp = props => shallow(<TableTestComp {...props}/>);
  const mountTableTestComp = props => mount(<TableTestComp {...props}/>);

  it('should create component', () => {
    mountTableTestComp().should.have.type(TableTestComp);
  });

  it('should wrap children with div', () => {
    shallowTableTestComp().should.have.tagName('div');
  });

  it('should use passed className', () => {
    shallowTableTestComp({
      className: 'test-class'
    }).should.have.className('test-class');
  });

  // TODO Add more tests
});
