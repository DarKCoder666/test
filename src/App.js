import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history';
import PokemonsListPage from './pages/PokemonsListPage/PokemonsListPage';
import PokemonPage from './pages/PokemonPage';

import './scss/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Route path="/" exact component={PokemonsListPage} />
          <Route path="/pokemon/:pokemonID" exact component={PokemonPage} />
        </Router>
      </div>
    );
  }
}

export default App;
