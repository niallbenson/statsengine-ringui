import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Ball from 'react-svg-loader!../../assets/images/football.svg';

// eslint-disable-next-line no-unused-vars
import styles from './loading-screen.css';

const className = 'loadingScreen';

export default class LoadingScreen extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    return (
      <div className={className} id="stage">
        <div id="traveler">
          <div id="bouncer">
            <Ball className="ball"/>
          </div>
        </div>
      </div>
    );
  }
}
