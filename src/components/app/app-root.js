import React, {Component} from 'react';
import Header, {
  Logo,
  Tray,
  SmartProfile,
  SmartServices,
  TrayIcon,
} from '@jetbrains/ring-ui/components/header/header';
import Link from '@jetbrains/ring-ui/components/link/link';
import settingsIcon from '@jetbrains/icons/settings-20px.svg';
import searchIcon from '@jetbrains/icons/search-20px.svg';
import Auth from '@jetbrains/ring-ui/components/auth/auth';
import Footer from '@jetbrains/ring-ui/components/footer/footer';
import spaceLogo from '@jetbrains/logos/space/space.svg';

import Home from '../home/home';
import Competitions from '../competitions/competitions';

import './app.css';

export default class AppRoot extends Component {
  componentDidMount() {
    // You can uncomment this after registering your client as a Hub service
    // https://www.jetbrains.com/help/hub/2017.3/OAuth-2.0-Authorization.html#d79479e312
    // this.auth.init();
  }

  auth = new Auth({
    // clientId: <your client id here>
    serverUri: 'https://hub.jetbrains.com' // replace with your Hub server
  });

  render() {
    return (
      <div>
        <Header>
          <a href="/">
            <Logo
              glyph={spaceLogo}
              size={Logo.Size.Size48}
            />
          </a>
          <Link active href="#">Fixtures</Link>
          <Link href="#">Results</Link>
          <Link href="#">Player stats</Link>
          <Link href="#">Team stats</Link>
          <Tray>
            <TrayIcon title="Search" icon={searchIcon}/>
            <TrayIcon title="Settings" icon={settingsIcon}/>
            <SmartServices auth={this.auth}/>
            <SmartProfile auth={this.auth}/>
          </Tray>
        </Header>
        {/* <Home className="home" default="fixtures"/> */}
        <Competitions className="comps" />
        <Footer/>
      </div>
    );
  }
}
