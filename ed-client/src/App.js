import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import fecha from 'fecha';

import './App.css';

const DownloadsGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: 44.4938100, lng: 11.3387500 }}
    onClick={props.onMapClick}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={10}
    >
      {props.markers.map(marker => (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

class App extends Component {
  state = {
    markers: []
  };

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng

    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let newMarkerRegion;
      let newMarkerCountry;

      json.results.forEach(
        (element, index) => {
          if (element.types[0] === 'administrative_area_level_1') {
            newMarkerRegion = element.formatted_address;
          }
          if (element.types[0] === 'country') {
            newMarkerCountry = element.formatted_address;
          }
        }
      );

      return [newMarkerRegion, newMarkerCountry];
    })
    .then(lol => {
      console.log(lol);

      if (lol[0] !== undefined) {
        const nextMarkers = [
          ...this.state.markers,
          {
            position: event.latLng,
            defaultAnimation: 2,
            key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys.
            country: lol[0],
            region: lol[1],
            time: Date.now(),
          },
        ];

        this.setState({
          markers: nextMarkers,
        });
      } else {
        console.log('Cannot drop a marker on 🌊!');
      }
    }

    )
    .catch(err => {
      console.error('Reverse geocoding failed.')
    });

    console.log(this.state);
    console.log('====================================');

  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
      <div className="App">
          <DownloadsGoogleMap
            containerElement={
              <div style={{ height: `500px` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={this.handleMapLoad.bind(this)}
            onMapClick={this.handleMapClick.bind(this)}
            markers={this.state.markers}
            onMarkerRightClick={this.handleMarkerRightClick.bind(this)}
          />
      </div>
    );
  }
}

export default App;
