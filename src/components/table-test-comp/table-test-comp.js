import React, {Component} from 'react';

import reactDecorator from '../../.storybook/react-decorator';

import {Grid, Row, Col} from '@jetbrains/ring-ui/components/grid/grid';
import Link from '@jetbrains/ring-ui/components/link/link';
import Pager from '@jetbrains/ring-ui/components/pager/pager';
import Button from '@jetbrains/ring-ui/components/button/button';

import Table from '@jetbrains/ring-ui/components/table/table';
import MultiTable from '@jetbrains/ring-ui/components/table/multitable';
import Selection from '@jetbrains/ring-ui/components/table/selection';
import mock from '@jetbrains/ring-ui/components/table/table.examples.json';
import {continents, countries} from '@jetbrains/ring-ui/components/table/table.examples2.json';

const PAGE_SIZE = 7;
const TOTAL = mock.length;

export default class TableTestComp extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const {children, className, ...restProps} = this.props;
    const classes = classNames(styles.tableTestComp, className);

    return (
      <div
        {...restProps}
        className={classes}
      >
        {children}
      </div>
    );
  }
}
