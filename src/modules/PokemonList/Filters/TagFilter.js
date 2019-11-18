import React, { Component } from 'react';
import { Checkbox } from 'antd';

export class TagFilter extends Component {
  render() {
    const { pokemonTypes, setFilterTypes } = this.props;

    return (
      <div>
        <Checkbox.Group options={pokemonTypes} defaultValue={['Pear']} onChange={setFilterTypes} />
      </div>
    )
  }
}

export default TagFilter
