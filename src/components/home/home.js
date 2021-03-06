import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Heading from '@jetbrains/ring-ui/components/heading/heading';
import {Link} from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import styles from './home.css';

const className = 'home';

export default class Home extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  render() {

    return (
      <div className={className}>
        <Heading level={Heading.Levels.H1}>{'theStatsEngine'}</Heading>
        <p>
          <strong>{'theStatsEngine'}</strong>
          {' is a data visualisation and analysis engine for the '}
          <a
            href="https://github.com/statsbomb/open-data"
            target="_blank"
            rel="noreferrer"
          >
            {'StatsBomb Open Data'}
          </a>
          {' repository.'}
        </p>
        <p>
          {`StatsBomb are committed to sharing new data and research publicly to
          enhance understanding of the game of association football. They want
          to actively encourage new research
          and analysis at all levels and therefore have made certain leagues of
          StatsBomb data freely available for public use for research projects
          and genuine interest in football
          analytics. StatsBomb are hoping that by making data freely available
          they will extend the wider football analytics community and attract
          new talent to the industry.`}
        </p>
        <p>
          <strong>{'theStatsEngine is an independent project'}</strong>
          {` developed to make use of this data. It allows you to analyse top
          flight women\'s football from England and USA, as well
          as all the data from 2018 World Cup, Arsenal\'s Invincibles season,
          every La Liga game Messi has played in and every Champions League
          final since 1999.`}
        </p>
        <p>
          {'Get started now by viewing '}
          <Link
            to="/competitions"
          >
            {'competitions'}
          </Link>
          {'.'}
        </p>
        <div id="statsbomb-logo-container">
          <span id="kindly-provided-by">
            {'All data used on this site made available by'}
          </span>
          <br/>
          <a href="https://statsbomb.com/" target="_blank" rel="noreferrer">
            <img
              alt="site logo"
              src="src/assets/images/SB_Regular.png"
              id="statsbomb-logo"
            />
          </a>
        </div>
      </div>
    );
  }
}
