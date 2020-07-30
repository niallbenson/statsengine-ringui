import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './home.css';

export default class Home extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

render() {
  const { children, className, ...restProps } = this.props;
  const classes = classNames(styles.home, className);

  return (
    <div
      {...restProps}
      className={classes}
    >
      Home component....
      {this.props.default}
      {children}
    </div>
  );
}
}
