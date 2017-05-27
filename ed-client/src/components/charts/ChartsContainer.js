import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-responsive-tabs';

import 'react-responsive-tabs/styles.css'

import ChartDownloads from './ChartDownloads';
import ChartTimesOfDay from './ChartTimesOfDay';

class ChartsContainer extends Component {
  render() {
    return (
        <Tabs containerClass={'tabs-container'} items={[
            {
              title: 'By country and time of the day',
              tabClassName: 'tab',
              transformWidth: 667,
              getContent: () => (
                <div className='chartGroup'>
                  <ChartDownloads {...this.props} />
                  <ChartTimesOfDay {...this.props} />
                </div>
              ),
            },
            {
              title: 'By OS and app version',
              getContent: () => (
                <div className='panel'>

                </div>
              ),
              tabClassName: 'tab',
              panelClassName: 'panel',
              transformWidth: 667,
            }
          ]}
        />
            /*<div className='charts-container'>
              <div className="section chart-countries">
                <ChartDownloads {...this.props} />
              </div>
              <div className="section chart-times-of-day">
                <ChartTimesOfDay {...this.props} />
              </div>
            </div>*/
    );
  }
}

ChartsContainer.propTypes = {
  markers: PropTypes.array.isRequired,
}

export default ChartsContainer;
