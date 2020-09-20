import React, {PureComponent} from 'react';
import Header, {
  SmartProfile,
  SmartServices,
  Tray,
  TrayIcon
} from '@jetbrains/ring-ui/components/header/header';
import settingsIcon from '@jetbrains/icons/settings-20px.svg';
import searchIcon from '@jetbrains/icons/search-20px.svg';

// eslint-disable-next-line import/no-unresolved
import Ball from 'react-svg-loader!../../assets/images/football2.svg';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Link} from 'react-router-dom';

import styles from './header-container.css';

export default class HeaderContainer extends PureComponent {
  static propTypes = {
    auth: PropTypes.object
  };

  render() {
    const {auth} = this.props;
    const classes = classNames(styles.headerContainer, 'header-container');

    return (
      <div className={classes}>
        <Header>
          <a href="/">
            <Ball id="ball-logo"/>
          </a>
          <Link
            to="/competitions"
            className="header-router-link"
          >
            {'Competitions'}
          </Link>
          <Link
            to="/home"
            className="header-router-link"
          >
            {'Analyse'}
          </Link>
          <Link
            to="/home"
            className="header-router-link"
          >
            {'Player Stats'}
          </Link>
          <Link
            to="/home"
            className="header-router-link"
          >
            {'Team Stats'}
          </Link>
          <Tray>
            <TrayIcon title="Search" icon={searchIcon}/>
            <TrayIcon title="Settings" icon={settingsIcon}/>
            <SmartServices auth={auth}/>
            <SmartProfile auth={auth}/>
          </Tray>
        </Header>
      </div>
    );
  }
}
