import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './heatmap-settings.css';

const className = 'heatmap-settings';

export default class HeatmapSettings extends PureComponent {
  static propTypes = {
    playerId: PropTypes.number.isRequired
  };

  loadPage() {
    const {playerId} = this.props;


  }

  render() {
    return (
      <div className={className}>

        {'Settings'}
      </div>
    );
  }
}
