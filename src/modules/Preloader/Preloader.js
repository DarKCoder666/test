import React, { Component } from 'react';
import Loader from './loader.gif';

import './Preloader.scss';

export class Preloader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={Loader} alt="Preloading" />
      </div>
    )
  }
}

export default Preloader;
