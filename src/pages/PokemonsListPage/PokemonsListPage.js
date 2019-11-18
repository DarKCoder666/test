import React, { Component } from 'react';
import {
  observer,
  inject
} from 'mobx-react';
import Header from '../../modules/Header/Header';
import PokemonCard from '../../modules/PokemonList/PokemonCard/PokemonCard';
import ListPagination from '../../modules/PokemonList/ListPagination/ListPagination';
import Preloader from '../../modules/Preloader/Preloader';
import Filters from '../../modules/PokemonList/Filters/Filters';

import './PokemonsListPage.scss';

export class PokemonsListPage extends Component {
  UNSAFE_componentWillMount() {
    this.props.PokemonStore.loadPokemons();
    this.props.PokemonStore.loadTypes();
  }

  render() {
    const {
      currentPage,
      numberOfPokemons,
      pokemonsList,
      changePage,
      offsetSize,
      loading,
      possibleOffsets,
      searchLine,
      pokemonTypes,

      setOptionSize,
      setSearchLine,
      setTypes,
      loadPokemons
    } = this.props.PokemonStore;
    const numberOfPages = Math.ceil(numberOfPokemons / offsetSize);
    const pokemonItemCards = pokemonsList.map(p => (
      <PokemonCard pokemon={p} key={p.id}/>
    ));

    return (
      <div className="container">
        <Header />

        <Filters
          possibleOffsets={possibleOffsets}
          searchLine={searchLine}
          pokemonTypes={pokemonTypes}
          offsetSize={offsetSize}
          setOptionSize={setOptionSize}
          setSearchLine={setSearchLine}
          setTypes={setTypes}
          loadPokemons={loadPokemons}
        />

        <div className="pokemonlist-cards">
          {!loading ? pokemonItemCards : <Preloader />}
        </div>

        <div className="pokemonlist-pagination">
          <ListPagination
            currentPage={currentPage + 1}
            numberOfPages={numberOfPages}
            pageChangeHandler={changePage}
            pageSize={offsetSize}
          />
        </div>
      </div>
    )
  }
}

export default inject('PokemonStore')(observer(PokemonsListPage));
