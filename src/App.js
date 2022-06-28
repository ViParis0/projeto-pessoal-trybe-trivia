import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" componente={ Game } />
        </Switch>
      </main>
    );
  }
}
