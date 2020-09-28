import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import closeIcon from '@jetbrains/icons/close.svg';

import {Button} from '@jetbrains/ring-ui';

import {Slider} from 'rsuite';

// eslint-disable-next-line no-unused-vars
import styles from './heatmap-settings.css';

const className = 'heatmap-settings';

export default class HeatmapSettings extends PureComponent {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    matchId: PropTypes.number.isRequired,
    clearHeatmap: PropTypes.func.isRequired,
    gridSize: PropTypes.number.isRequired,
    onGridSizeChange: PropTypes.func.isRequired
  };

  state = {
    player: undefined,
    defaultGridSliderValue: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {gridSize} = nextProps;

    if (gridSize !== prevState.gridSize) {
      return {gridSize};
    }

    return null;
  }

  componentDidMount() {
    this.loadPage();
  }

  // eslint-disable-next-line no-magic-numbers
  gridSizes = [1, 2, 4, 5, 8, 10, 20, 40];

  loadPage() {
    const {playerId, matchId} = this.props;

    fetch(`http://localhost:8080/api/tactical-lineup-player/player/${playerId}/match/${matchId}/first`).
      then(res => res.json()).
      then(data => this.setState({player: data}));
  }

  render() {
    const {player} = this.state;
    const {clearHeatmap, onGridSizeChange, gridSize} = this.props;

    if (!player) {
      return <div/>;
    }

    return (
      <div className={className}>
        <Button icon={closeIcon} primary onClick={clearHeatmap}/>
        {player.name}
        <div id={'slider-container'}>
          {'Grid size'}
          <Slider
            id={'slider'}
            defaultValue={this.gridSizes.indexOf(gridSize)}
            min={0}
            max={this.gridSizes.length - 1}
            tooltip={false}
            onChange={n => onGridSizeChange(this.gridSizes[n])}
            style={{width: 200}}
          />
        </div>
      </div>
    );
  }
}
