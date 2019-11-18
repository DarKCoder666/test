import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SearchSizeOption from './SearchSizeOption';
import TagFilter from './TagFilter';

export class Filters extends Component {
  render() {
    const { possibleOffsets, pokemonTypes, offsetSize, setSearchLine, setOptionSize, loadPokemons } = this.props;
    return (
      <div>
        <SearchBox onSearchBoxChange={setSearchLine} />
        <SearchSizeOption
          options={possibleOffsets}
          defaultOption={offsetSize}
          onSizeOptionChange={setOptionSize}
        />
        <TagFilter pokemonTypes={pokemonTypes} setFilterTypes={this.setFilterTypes.bind(this)} />
        <button onClick={loadPokemons}>Filter</button>
      </div>
    )
  };

  setFilterTypes(activeTypesArray) {
    const updatedPokemonTypes = this.props.pokemonTypes.map(type => ({
      ...type,
      active: activeTypesArray.includes(type.value)
    }));

    this.props.setTypes(updatedPokemonTypes);
  }
}

export default Filters
