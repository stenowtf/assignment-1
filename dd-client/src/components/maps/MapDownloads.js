import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';

const MapDownloads = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    defaultCenter={{ lat: 44.4938100, lng: 11.3387500 }}
    onClick={props.onMapClick}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={10}
    >
      {props.downloads.map(marker => (
        <Marker
          {...marker}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

MapDownloads.propTypes = {
  downloads: PropTypes.array.isRequired,
  onMapLoad: PropTypes.func.isRequired,
  onMapClick: PropTypes.func.isRequired,
}

export default MapDownloads;