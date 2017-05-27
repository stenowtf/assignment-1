import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChartByAppVersion extends Component {
  render() {
    const {markers} = this.props;

    return (
      <div className='chart'>
        by version
      </div>
    );
  }
}

ChartByAppVersion.propTypes = {
  downloads: PropTypes.array.isRequired,
}

export default ChartByAppVersion;
