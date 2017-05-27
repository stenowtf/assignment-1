import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChartByOS extends Component {
  render() {
    const {markers} = this.props;

    return (
      <div className='chart'>
        by os
      </div>
    );
  }
}

ChartByOS.propTypes = {
  downloads: PropTypes.array.isRequired,
}

export default ChartByOS;
