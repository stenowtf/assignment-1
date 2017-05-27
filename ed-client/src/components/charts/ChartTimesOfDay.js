import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { VictoryChart, VictoryBar } from 'victory-chart';
import { VictoryTheme } from 'victory-core';

class ChartTimesOfDay extends Component {
  render() {
    const {markers} = this.props;

    let timesOfDay = [
      { time: 'Morning', total: 0 },
      { time: 'Afternoon', total: 0 },
      { time: 'Evening', total: 0 },
    ];

    markers.forEach(marker => {
      let timeOfDay;
      let hour = moment(marker.time, 'HH:mm:ss MM/DD/YYYY').hour();

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
    );
  }
}

export default ChartTimesOfDay;
