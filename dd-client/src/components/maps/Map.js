import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    defaultCenter={{ lat: 44.4938100, lng: 11.3387500 }}
    onClick={props.onMapClick}
  >
    {props.downloads.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));

Map.propTypes = {
  downloads: PropTypes.array.isRequired,
  onMapLoad: PropTypes.func.isRequired,
  onMapClick: PropTypes.func.isRequired,
};

export default Map;
