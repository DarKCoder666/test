import React, { Component } from 'react'
import { Select } from 'antd';

const { Option } = Select;

export class SearchSizeOption extends Component {
  render() {
    const { options, onSizeOptionChange, defaultOption } = this.props;
    const optionsElements = options.map((el, i) => (
      <Option value={el} key={i}>{el}</Option>
    ))
    return (
      <div>
        <Select defaultValue={defaultOption} onChange={onSizeOptionChange}>
          {optionsElements}
        </Select>
      </div>
    )
  }
}

export default SearchSizeOption
