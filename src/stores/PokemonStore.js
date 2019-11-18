import {
  observable,
  decorate,
  action
} from 'mobx'

import { isThereActivePokemonType, removeRepeatedObjects } from '../utils/filtration';

const apiBase = 'https://pokeapi.co/api/v2';
const maxNumberOfPokemons = 1000;

class PokemonStore {
  pokemonsList = [];
  currentPage = 0;
  numberOfPokemons = null;
  loading = false;
  //Filters
  possibleOffsets = [10, 20, 50];
  offsetSize = 20;
  searchLine = '';
  pokemonTypes = [];

  loadPokemons = async () => {
    this.setLoadingState(true);

    let data, response;

    // If there is no name and type in filter
    if (!this.searchLine && !isThereActivePokemonType(this.pokemonTypes)) {
      // Fetch pokemons list with their urls
      response = await fetch(
        `${apiBase}/pokemon?offset=${this.currentPage * this.offsetSize}&limit=${this.offsetSize}`
      );
      data = await response.json();
      let count = data.count;
      // Fetch each pokemon individually and prepare final view of list of the pokemons
      data = await this.getEjectedPokemons(data.results);
      this.setNumberOfPokemons(count);
    }

    // If there is a name of pokemon but no type in filter
    if (this.searchLine && !isThereActivePokemonType(this.pokemonTypes)) {
      const pokemon = await this.getPokemonByName(this.searchLine);

      if (pokemon) { // If not null
        data = [pokemon];
      } else {
        data = [];
      }
      this.setNumberOfPokemons(null); // To hide the pagination
    }

    // If there is no name of pokemon but types of pokemons
    if (!this.searchLine && isThereActivePokemonType(this.pokemonTypes)) {
      let mergedPokemons = [];

      for (let i = 0; i < this.pokemonTypes.length; i++) {
        if (!this.pokemonTypes[i].active) continue;

        response = await fetch(`${apiBase}/type/${this.pokemonTypes[i].value}`);
        data = await response.json();
        data = data.pokemon.map(el => ({
          ...el.pokemon
        }));
        mergedPokemons = [...mergedPokemons, ...data];
      }

      mergedPokemons = removeRepeatedObjects(mergedPokemons);
      data = [...mergedPokemons].splice(this.currentPage * this.offsetSize, this.offsetSize);
      data = await this.getEjectedPokemons(data);
      this.setNumberOfPokemons(mergedPokemons.length);
    }

    // If there is a name and type
    if (this.searchLine && isThereActivePokemonType(this.pokemonTypes)) {
      const pokemon = await this.getPokemonByName(this.searchLine);

      if (pokemon) { // If not null
        let theSameType = false;
        const activeTypes = [];
        
        // Collecting all active types
        for (let i = 0; i < this.pokemonTypes.length; i++) {
          if (!this.pokemonTypes[i].active) continue;
          activeTypes.push(this.pokemonTypes[i].value);
        }
        
        // Comparing pokemon types with active ones
        for (let i = 0; i < pokemon.types.length; i++) {
          if(activeTypes.includes(pokemon.types[i].type.name)) {
            theSameType = true;
            break;
          }
        }

        if(theSameType) {
          data = [pokemon];
        } else {
          data = [];
        }

      } else {
        data = [];
      }

    }

    // Set list
    this.setPokemons(data);

    this.setLoadingState(false);
  };

  loadPokemon = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  loadTypes = async () => {
    const res = await fetch(`${apiBase}/type`);
    let data = await res.json();
    data = data.results.map(el => ({
      label: el.name,
      value: el.name,
      active: false
    }));

    this.setTypes(data);
  };

  getPokemonByName = async (name) => {
    try {
      const res = await fetch(`${apiBase}/pokemon/${name}`);
      let data = await res.json();
      return data; // Single pokemon object
    } catch (err) {
      return null; // No pokemon with such name
    }
  };

  getEjectedPokemons = async (pokemons_res) => {
    let pokemon, pokemonPromises = [];

    for (let i = 0; i < pokemons_res.length; i++) {
      pokemon = pokemons_res[i];
      pokemonPromises.push(await this.loadPokemon(pokemon.url));
    }

    const pokemons = await Promise.all(pokemonPromises);
    return pokemons;
  };

  setPokemons = pokemons => {
    this.pokemonsList = [...pokemons];
  };

  setNumberOfPokemons = amount => {
    this.numberOfPokemons = amount;
  };

  setLoadingState = state => {
    this.loading = state;
  };

  setSearchLine = line => {
    this.searchLine = line;
  };

  setOptionSize = option => {
    this.offsetSize = option;
  };

  setTypes = types => {
    this.pokemonTypes = types;
  };

  changePage = (pageNumber) => {
    this.currentPage = pageNumber - 1;
    this.loadPokemons();
  };

}

decorate(PokemonStore, {
  pokemonsList: observable,
  currentPage: observable,
  offsetSize: observable,
  numberOfPokemons: observable,
  loading: observable,
  searchLine: observable,
  pokemonTypes: observable,
  loadTypes: observable,

  setPokemons: action,
  setNumberOfPokemons: action,
  changePage: action,
  setLoadingState: action,
  setSearchLine: action,
  setOptionSize: action,
  setTypes: action,
});

export default new PokemonStore();
