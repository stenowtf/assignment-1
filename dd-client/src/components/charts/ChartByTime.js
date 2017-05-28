import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryBar } from 'victory-chart';
import { VictoryTheme } from 'victory-core';

import utils from '../../utils';

class ChartByTime extends Component {
  render() {
    const {downloads} = this.props;

    let timesOfDay = [
      { time: 'Morning', total: 0 },
      { time: 'Afternoon', total: 0 },
      { time: 'Evening', total: 0 },
    ];

    downloads.forEach(download => {
      let timeOfDay;
      let hour = utils.getHour(download.time);

      if (hour <= 12) {
        timeOfDay = 'Morning';
      } else if (hour <= 18) {
        timeOfDay = 'Afternoon';
      } else {
        timeOfDay = 'Evening';
      }

      timesOfDay.forEach(t => {
        if (t.time === timeOfDay) {
          t.total += 1;
        }
      });
    });

    return (
      <div className='chart'>
        <VictoryChart
          theme={VictoryTheme.material}
        >
          <VictoryBar
            style={{
              data: {
                fill: (t) => {
                  if (t.time === 'Morning') {
                    return 'red';
                  }
                  else if (t.time === 'Afternoon') {
                    return 'green';
                  }
                  return 'blue';
                },
                width: 20,
              },
            }}
            data={timesOfDay}
            x='time'
            y='total'
          />
        </VictoryChart>
      </div>
    );
  }
}

ChartByTime.propTypes = {
  downloads: PropTypes.array.isRequired,
};

export default ChartByTime;
