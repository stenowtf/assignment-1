import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-responsive-tabs';

import ChartByCountry from './ChartByCountry';
import ChartByTime from './ChartByTime';
import ChartByOS from './ChartByOS';
import ChartByAppVersion from './ChartByAppVersion';

import 'react-responsive-tabs/styles.css';

class ChartsSection extends Component {
  render() {
    return (
        <Tabs containerClass={'tabs-container'} items={[
          {
            title: 'By country and time of the day',
            transformWidth: 667,
            getContent: () => (
                <div className='chartGroup'>
                  <ChartByCountry {...this.props} />
                  <ChartByTime {...this.props} />
                </div>
              ),
          },
          {
            title: 'By OS and app version',
            transformWidth: 667,
            getContent: () => (
                <div className='chartGroup'>
                  <ChartByOS {...this.props} />
                  <ChartByAppVersion {...this.props} />
                </div>
              ),
          }
        ]}
        />
    );
  }
}

ChartsSection.propTypes = {
  downloads: PropTypes.array.isRequired,
};

export default ChartsSection;
