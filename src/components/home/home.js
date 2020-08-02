import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './home.css';

import Heading, { H1, H2, H3, H4 } from '@jetbrains/ring-ui/components/heading/heading';
import { Link } from 'react-router-dom';

export default class Home extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const { className, staticContext, ...restProps } = this.props;
    const classes = classNames(styles.home, className);

    return (
      <div className="home">
        <Heading level={Heading.Levels.H1}>StatsEngine</Heading>
        <p>
          StatsEngine is a data visualisation and analysis engine for the &nbsp;<a href="https://github.com/statsbomb/open-data" target="_blank">StatsBomb Open Data</a> repository.
        </p>
        <p>
          StatsBomb are committed to sharing new data and research publicly to enhance understanding of the game of association football. They want to actively encourage new research
          and analysis at all levels and therefore have made certain leagues of StatsBomb Data freely available for public use for research projects and genuine interest in football
          analytics. StatsBomb are hoping that by making data freely available, they will extend the wider football analytics community and attract new talent to the industry.
        </p>
        <p>
          StatsEngine was created to try and support StatsBomb in this mission.
        </p>
        <p>
          Using this site you will be able to analyse every La Liga game Lionel Messi has ever played in, along with every single event in the 2018 World Cup, every minute of every game 
          played by Arsenal in their immortal invincibles season and every second of action in the FA Women's Super League since 2018.
        </p>
        <p>
          Get started now by viewing <Link to="/competitions">competitions.</Link>
        </p>
      </div>
    );
  }
}
