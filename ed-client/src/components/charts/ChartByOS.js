import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory-pie';
import { VictoryTooltip, VictoryTheme } from 'victory-core';

class ChartByOS extends Component {
  render() {
    const {downloads} = this.props;

    let oss = [
      { name: 'iOS', total: 0 },
      { name: 'Android', total: 0 },
    ];

    downloads.forEach(download => {
      oss.forEach(o => {
        if (o.name === download.os) {
          o.total += 1;
        }
      });
    });

    return (
      <div className='chart'>
        <VictoryPie
          labelComponent={
            <VictoryTooltip
              style={{
                fontSize: 10,
              }}
              flyoutStyle={{
                stroke: 'black',
                fill: 'white',
              }}
            />
          }
          labels={(o) => o.name + ': ' + o.total}
          theme={VictoryTheme.material}
          data={oss}
          x="name"
          y="total"
          colorScale="qualitative"
          sortKey={['total', 'name']}
        >
        </VictoryPie>
      </div>
    );
  }
}

ChartByOS.propTypes = {
  downloads: PropTypes.array.isRequired,
};

export default ChartByOS;
