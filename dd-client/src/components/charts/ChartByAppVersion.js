import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

class ChartByAppVersion extends Component {
  render() {
    const {downloads} = this.props;
    let versions = [];

    downloads.forEach(download => {
      const extendedVersion = download.version + ' (' + download.os + ')';

      let found = versions.find((element) => {
        return element.version === extendedVersion;
      });

      if (found === undefined) {
        versions.push({
          version: extendedVersion,
          total: 1,
        });
      } else {
        let foundIndex = versions.findIndex((element) => {
          return element.version === extendedVersion;
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
