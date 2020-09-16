import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Ball from 'react-svg-loader!../../assets/images/football.svg';

import styles from './loading-screen.css';

export default class LoadingScreen extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const classes = classNames(styles.loadingScreen, 'loadingScreen');

    return (
      <div className={classes} id='stage'>
        <div id="traveler">
          <div id="bouncer">
            <Ball className='ball' />
          </div>
        </div>
      </div>
    );
  }
}
