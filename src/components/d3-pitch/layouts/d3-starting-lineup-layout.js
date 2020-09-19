import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { HomeAway } from '../enums/home-away';
import getPitchAbsoluteXY from '../calcs/pitch-absolute-xy';
import getPlayerDisplayLastName from '../calcs/player-display-name';

import * as d3 from 'd3';

export default class D3StartingLineupLayout extends PureComponent {

  state = {
    height: undefined,
    width: undefined,
    match: undefined,
    homeStartingLineup: undefined,
    awayStartingLineup: undefined
  }

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setState({
      height: this.props.height,
      width: this.props.width
    }, () => this.loadPage()
    );
  }

  loadPage = () => {
    fetch('http://localhost:8080/api/match/' + this.props.matchId)
      .then(res => res.json())
      .then(data => this.setState({ match: data }, () => this.loadLineups()));
  }

  loadLineups = () => {
    Promise.all([
      fetch('http://localhost:8080/api/tactics/match/' + this.state.match.id + '/team/' + this.state.match.homeTeamId),
      fetch('http://localhost:8080/api/tactics/match/' + this.state.match.id + '/team/' + this.state.match.awayTeamId)
    ])
      .then(async ([p1, p2]) => {
        let homeTactics = await p1.json();
        let awayTactics = await p2.json();

        this.setState({
          homeStartingLineup: homeTactics[0],
          awayStartingLineup: awayTactics[0]
        }, () => this.displayStartingLineups());
      });
  }

  loadPlayerEvents = (player) => {
    fetch(`http://localhost:8080/api/event/match/${this.state.match.id}/all/player/${player.playerId}`)
      .then(res => res.json())
      .then(data => console.log('Player events', data))
      .catch(console.log);
  }

  getPositionRelativeXY(position) {
    switch (position) {
      case 'Goalkeeper': {
        return [0.05, 0.5];
      }
      case 'Right Back': {
        return [0.25, 0.8];
      }
      case 'Right Center Back': {
        return [0.25, 0.6];
      }
      case 'Left Center Back': {
        return [0.25, 0.4];
      }
      case 'Left Back': {
        return [0.25, 0.2];
      }
      case 'Center Back': {
        return [0.25, 0.5];
      }
      case 'Right Wing Back': {
        return [0.25, 0.8];
      }
      case 'Left Wing Back': {
        return [0.25, 0.2];
      }
      case 'Right Defensive Midfield': {
        return [0.5, 0.6];
      }
      case 'Left Center Midfield': {
        return [0.6, 0.4];
      }
      case 'Center Defensive Midfield': {
        return [0.5, 0.5];
      }
      case 'Left Defensive Midfield': {
        return [0.5, 0.4];
      }
      case 'Right Center Midfield': {
        return [0.6, 0.6];
      }
      case 'Right Midfield': {
        return [0.6, 0.8];
      }
      case 'Left Midfield': {
        return [0.6, 0.2];
      }
      case 'Center Midfield': {
        return [0.6, 0.5];
      }
      case 'Right Attacking Midfield': {
        return [0.7, 0.8];
      }
      case 'Left Attacking Midfield': {
        return [0.7, 0.2];
      }
      case 'Right Wing': {
        return [0.7, 0.85];
      }
      case 'Center Attacking Midfield': {
        return [0.7, 0.5];
      }
      case 'Left Wing': {
        return [0.7, 0.15];
      }
      case 'Center Forward': {
        return [0.9, 0.5];
      }
      case 'Right Center Forward': {
        return [0.9, 0.6];
      }
      case 'Left Center Forward': {
        return [0.9, 0.4];
      }
      case 'Secondary Striker': {
        return [0.8, 0.5];
      }
    }
  }

  displayStartingLineups() {
    this.state.homeStartingLineup.players.forEach(p => {
      this.displayPlayer(p, HomeAway.HOME);
    });

    this.state.awayStartingLineup.players.forEach(p => {
      this.displayPlayer(p, HomeAway.AWAY);
    });
  }

  displayPlayer(player, homeOrAway) {
    const absoluteXy = this.getPlayerAbsoluteXy(player, homeOrAway);
    const x = absoluteXy[0];
    const y = absoluteXy[1];

    const svgNode = this.createPlayerNode(x, y, player, homeOrAway);

    this.addPlayerNodeClass(svgNode);
    this.addJerseyNumber(x, y, player.jerseyNumber);
    this.addPlayerName(x, y, player);
    this.addPlayerClickEvent(svgNode, player);
  }

  createPlayerNode(x, y, player, homeOrAway) {
    return d3.select(this.ref.current)
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 10)
      .style('stroke', 'black')
      .style('stroke-width', '1')
      .style('fill', homeOrAway === HomeAway.HOME ? '#007bff' : '#dc3545')
      .style('cursor', 'pointer');
  }

  addPlayerNodeClass(node) {
    node.attr('class', 'player-node');
  }

  addJerseyNumber(x, y, jerseyNumber) {
    d3.select(this.ref.current)
      .append('text')
      .attr('x', x)
      .attr('y', y)
      .style('font-family', 'sans-serif')
      .style('font-size', '9px')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'central')
      .style('stroke', 'black')
      .style('pointer-events', 'none')
      .text(jerseyNumber ? jerseyNumber : '?');
  }

  addPlayerName(x, y, player) {
    const playerName = getPlayerDisplayLastName(player);

    d3.select(this.ref.current)
      .append('text')
      .attr('x', x)
      .attr('y', y + 18)
      .style('font-family', 'sans-serif')
      .style('font-size', '11px')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'central')
      .style('stroke', '#212529')
      .style('pointer-events', 'none')
      .text(playerName);
  }

  addPlayerClickEvent(node, player) {
    node.on('click', () => this.props.playerClick(player.playerId));
  }

  getPlayerAbsoluteXy(player, homeOrAway) {
    const xy = this.getPositionRelativeXY(player.position);

    const adjustedXy = this.getAdjustedXy(xy, homeOrAway);

    const adjustedX = adjustedXy[0];
    const adjustedY = adjustedXy[1];

    const absoluteXy = getPitchAbsoluteXY(adjustedX, adjustedY, this.state.width, this.state.height);
    return absoluteXy;
  }

  getAdjustedXy(xy, homeOrAway) {
    const x = xy[0];
    const y = xy[1];

    if (homeOrAway === HomeAway.HOME) {
      return [x / 2, y];
    }
    else if (homeOrAway === HomeAway.AWAY) {
      return [0.5 + (1 - x) / 2, 1 - y];
    }
  }

  render() {
    return <g ref={this.ref} />;
  }

}