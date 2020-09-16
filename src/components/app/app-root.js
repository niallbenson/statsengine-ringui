import React, { Component } from 'react';
import Auth from '@jetbrains/ring-ui/components/auth/auth';
import Footer from '@jetbrains/ring-ui/components/footer/footer';

import Home from '../home/home';
import Competitions from '../competitions/competitions';

import './app.css';
import HeaderContainer from '../header-container/header-container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Competition from '../competition/competition';
import Match from '../match/match';

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
      <BrowserRouter>
        <HeaderContainer auth={this.auth} />

        <Switch>
          <Route exact path = "/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/competitions" render={() => <Competitions className="competitions" />} />
          <Route path="/competition/:id" render={(props) => <Competition {...props} className="competition" />} />
          <Route path="/match/:id" render={(props) => <Match {...props} matchId="" className="match" />} />
        </Switch>

        <Footer />
      </BrowserRouter>
    );
  }
}
