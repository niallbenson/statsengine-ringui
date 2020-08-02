import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './match.css';

export default class Match extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    id: undefined,
    match: undefined
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.match.params.id
    });
  }

  loadPage = () => {

  }

  render() {
    const { className, ...restProps } = this.props;
    const classes = classNames(styles.match, className);

    if (!this.state.id) return (
      <div>match not set</div>
    );

    return (
      <div className={classes}>
        <span>id = {this.state.id}</span>
      </div>
    );
  }
}
