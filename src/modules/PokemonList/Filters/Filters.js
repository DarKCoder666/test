import React, { Component } from 'react';
import { Button } from 'antd';
import SearchBox from './SearchBox';
import SearchSizeOption from './SearchSizeOption';
import TagFilter from './TagFilter';

import './Filters.scss';

export class Filters extends Component {
  render() {
    const { possibleOffsets, pokemonTypes, offsetSize, setSearchLine, setOptionSize, loadPokemons } = this.props;
    return (
      <div className="filter">
        <SearchBox onSearchBoxChange={setSearchLine} />
        <div className="filter-tagfilter">
          <TagFilter pokemonTypes={pokemonTypes} setFilterTypes={this.setFilterTypes.bind(this)} />
        </div>
        <div className="filter-searchSize">
          <SearchSizeOption
            options={possibleOffsets}
            defaultOption={offsetSize}
            onSizeOptionChange={setOptionSize}
          />
        </div>

        <Button onClick={loadPokemons}>Apply filters</Button>

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
