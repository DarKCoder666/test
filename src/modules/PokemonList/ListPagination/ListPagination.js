import React, { Component } from 'react'
import { Pagination } from 'antd';

import './ListPagination.scss';

export class ListPagination extends Component {
  render() {
    const { currentPage, numberOfPages, pageChangeHandler, pageSize } = this.props;
    return (
      <div>
        {
          numberOfPages ?
            <Pagination className="listPagination" pageSize={pageSize} defaultCurrent={currentPage} total={(numberOfPages - 1) * pageSize} onChange={pageChangeHandler} />
          : ''
        }
      </div>
    )
  }

}
export default ListPagination;
