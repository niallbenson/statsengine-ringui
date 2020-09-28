import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import closeIcon from '@jetbrains/icons/close.svg';

import {Button} from '@jetbrains/ring-ui';

// eslint-disable-next-line no-unused-vars
import styles from './heatmap-settings.css';

const className = 'heatmap-settings';

export default class HeatmapSettings extends PureComponent {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    matchId: PropTypes.number.isRequired,
    clearHeatmap: PropTypes.func.isRequired
  };

  state = {
    player: undefined
  };

  componentDidMount() {
    this.loadPage();
  }

  loadPage() {
    const {playerId, matchId} = this.props;

    fetch(`http://localhost:8080/api/tactical-lineup-player/player/${playerId}/match/${matchId}/first`).
      then(res => res.json()).
      then(data => this.setState({player: data}));
  }

  render() {
    const {player} = this.state;
    const {clearHeatmap} = this.props;

    if (!player) {
      return <div/>;
    }

    return (
      <div className={className}>
        <Button icon={closeIcon} primary onClick={clearHeatmap}/>
        {player.name}
      </div>
    );
  }
}
