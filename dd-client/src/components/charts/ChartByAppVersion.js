import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

class ChartByAppVersion extends Component {
  render() {
    const {downloads} = this.props;
    let versions = [];

    downloads.forEach(download => {
      let found = versions.find((element) => {
        return element.version === download.os + ': ' + download.version;
      });

      if (found === undefined) {
        versions.push({
          version: download.os + ': ' + download.version,
          total: 1,
        });
      } else {
        let foundIndex = versions.findIndex((element) => {
          return element.version === download.os + ': ' + download.version;
        });
        versions[foundIndex] = {
          version: found.version,
          total: found.total + 1,
        };
      }
    });

    const columns = [{
      Header: 'App version',
      accessor: 'version',
    }, {
      Header: '# of downloads',
      accessor: 'total',
    }];

    return (
      <div className='chart'>
        <ReactTable
          data={versions}
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

ChartByAppVersion.propTypes = {
  downloads: PropTypes.array.isRequired,
};

export default ChartByAppVersion;
