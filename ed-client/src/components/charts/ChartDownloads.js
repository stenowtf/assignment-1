import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'

import 'react-table/react-table.css'

class ChartDownloads extends Component {
  render() {
    const {markers} = this.props;
    let countries = [];

    markers.forEach(marker => {
      let found = countries.find((element) => {
        return element.country === marker.country;
      });

      if (found === undefined) {
        countries.push({
          country: marker.country,
          total: 1,
        });
      } else {
        let foundIndex = countries.findIndex((element) => {
          return element.country === marker.country;
        });
        countries[foundIndex] = {
          country: found.country,
          total: found.total + 1,
        }
      }
    });

    const columns = [{
      Header: 'Country',
      accessor: 'country',
    }, {
      Header: '# of downloads',
      accessor: 'total',
    }]

    return (
      <div className='section chart-countries'>
        <ReactTable
          data={countries}
          columns={columns}
          defaultPageSize={15}
          showPageJump={false}
          showPageSizeOptions={false}
          defaultSorted={[{
            id: 'total',
            desc: true,
          }]}
        />
      </div>
    );
  }
}

ChartDownloads.propTypes = {
  markers: PropTypes.array.isRequired,
}

export default ChartDownloads;
