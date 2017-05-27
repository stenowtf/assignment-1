import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'

import 'react-table/react-table.css'

class ChartByCountry extends Component {
  render() {
    const {downloads} = this.props;
    let countries = [];

    downloads.forEach(download => {
      let found = countries.find((element) => {
        return element.country === download.country;
      });

      if (found === undefined) {
        countries.push({
          country: download.country,
          total: 1,
        });
      } else {
        let foundIndex = countries.findIndex((element) => {
          return element.country === download.country;
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
      <div className='chart'>
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

ChartByCountry.propTypes = {
  downloads: PropTypes.array.isRequired,
}

export default ChartByCountry;
