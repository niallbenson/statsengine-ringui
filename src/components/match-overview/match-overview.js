import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './match-overview.css';

import { DisplayType } from '../d3-pitch/enums/display-type';
import D3Pitch from '../d3-pitch/d3-pitch';

export default class MatchOverview extends PureComponent {

  state = {
    matchId: undefined,
    d3DisplayType: undefined,
    selectedPlayerId: undefined
  };

  componentDidMount() {
    this.setState({ 
      d3DisplayType: DisplayType.STARTING_LINEUP,
      matchId: this.props.matchId
    });
  }

  playerClickEvent = (id) => {
    this.setState({
      selectedPlayerId: id,
      d3DisplayType: DisplayType.PLAYER_HEATMAP
    }, () => console.log(this.state));
  }

  render() {
    if (this.state.matchId === undefined) return <div></div>

    const classes = classNames(styles.matchOverview, 'd3-pitch');

    return (
      <div className={classes}>
        <D3Pitch
          matchId={this.state.matchId} 
          displayType={this.state.d3DisplayType}
          playerClick={this.playerClickEvent} />
      </div>
    );
  }
}
