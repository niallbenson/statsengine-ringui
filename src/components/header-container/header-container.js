import React, { PureComponent } from 'react';
import Header, {
  Logo,
  Tray,
  SmartProfile,
  SmartServices,
  TrayIcon,
} from '@jetbrains/ring-ui/components/header/header';
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown';
import settingsIcon from '@jetbrains/icons/settings-20px.svg';
import searchIcon from '@jetbrains/icons/search-20px.svg';

import Ball from 'react-svg-loader!../../assets/images/football2.svg';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './header-container.css';
import { Link } from 'react-router-dom';

export default class HeaderContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const { auth } = this.props;
    const classes = classNames(styles.headerContainer, 'header-container');

    return (
      <div className={classes}>
        <Header>
          <a href="/">
            <Ball id="ball-logo"/>
          </a>
          <Link to="/competitions" className="header-router-link">Competitions</Link>
          <Link to="/home" className="header-router-link">Analyse</Link>
          <Link to="/home" className="header-router-link">Player Stats</Link>
          <Link to="/home" className="header-router-link">Team Stats</Link>
          <Tray>
            <TrayIcon title="Search" icon={searchIcon} />
            <TrayIcon title="Settings" icon={settingsIcon} />
            <SmartServices auth={auth} />
            <SmartProfile auth={auth} />
          </Tray>
        </Header>
      </div>
    );
  }
}
