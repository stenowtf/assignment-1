import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import fecha from 'fecha';
import Socket from './socket.js';

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
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      connected: false,
    }
  }
  componentDidMount() {
    let ws = new WebSocket('ws://localhost:4000');
    let socket = this.socket = new Socket(ws);
    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('marker add', this.onAddMarker.bind(this));
    socket.on('marker remove', this.onRemoveMarker.bind(this));
  }
  onConnect() {
    this.setState({connected: true});
    this.socket.emit('map subscribe');
  }
  onDisconnect() {
    this.setState({connected: false});
  }
  handleMapLoad(map) {
    // this._mapComponent = map;
    // if (map) {
    //   console.log(map.getZoom());
    // }
  }
  handleMapClick(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng

    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(json => {
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
    .then(geoInfo => {
      if (geoInfo[0] !== undefined) {
        const marker = {
          position: event.latLng,
          latitude: lat,
          longitude: lng,
          defaultAnimation: 2,
          key: Date.now(), // http://fb.me/react-warning-keys
          id: Date.now(),
          country: geoInfo[0],
          region: geoInfo[1],
          time: fecha.format(Date.now(), 'HH:mm:ss MM/DD/YYYY'),
        };

        this.socket.emit('marker add', marker);
      } else {
        console.log('Cannot drop a marker! Probably was on 🌊?');
      }
    })
    .catch(err => {
      console.error('Reverse geocoding failed.')
    });
  }
  onAddMarker(marker) {
    console.log(marker);

    marker.position = { lat: marker.latitude, lng: marker.longitude }

    let {markers} = this.state;
    markers.push(marker);
    this.setState({markers});
  }
  onRemoveMarker() {

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
