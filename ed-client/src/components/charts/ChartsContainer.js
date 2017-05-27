import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChartDownloads from './ChartDownloads';
import ChartTimesOfDay from './ChartTimesOfDay';

class ChartsContainer extends Component {
  render() {
    return (
      <div className='charts-container'>
        <div className="section chart-countries">
          <h3>Number of downloads (by country)</h3>
          <ChartDownloads {...this.props} />
        </div>
        <div className="section chart-times-of-day">
          <h3>Number of downloads (by times of the day)</h3>
          <ChartTimesOfDay {...this.props} />
        </div>
      </div>
    );
  }
}

export default ChartsContainer;
