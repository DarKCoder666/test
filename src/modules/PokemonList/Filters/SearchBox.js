import React, { Component } from 'react'
import { Input } from 'antd';

export class SearchBox extends Component {
  render() {
    const { onSearchBoxChange } = this.props;
    return (
      <div>
        <Input placeholder="Search by name" onChange={e => onSearchBoxChange(e.target.value)} />
      </div>
    )
  }
}

export default SearchBox
