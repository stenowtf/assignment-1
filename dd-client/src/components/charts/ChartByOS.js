import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-svg-piechart';

class ChartByOS extends Component {
  render() {
    const {downloads} = this.props;

    let oss = [
      { label: 'iOS', value: 0, color: '#007bb6' },
      { label: 'Android', value: 0, color: '#dd4b39' },
    ];

    downloads.forEach(download => {
      oss.forEach(o => {
        if (o.label === download.os) {
          o.value += 1;
        }
      });
    });

    return (
      <div className='chart'>
        <PieChart
          data={oss}
          sectorStrokeWidth={1}
        />
        <div>
          {
            oss.map((element, i) => (
                <div key={i}>
                    <span>
                        { element.label }: { element.value }
                    </span>
                </div>
            ))
          }
        </div>
      </div>
    );
  }
}

ChartByOS.propTypes = {
  downloads: PropTypes.array.isRequired,
};

export default ChartByOS;
