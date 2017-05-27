import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { notify } from 'react-notify-toast';

import MapDownloads from './MapDownloads';

class MapsContainer extends Component {
  constructor() {
    super();
    this.show = notify.createShowQueue();
  }
  mapLoad(map) {}
  dropMarker(event) {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    this.generateMarker(latitude, longitude, false);
  }
  generateMarker(latitude, longitude, isRandom) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude

    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      let country;

      json.results.forEach(
        (element) => {
          if (element.types[0] === 'country') {
            country = element.formatted_address;
          }
        }
      );

      return [json.status, country];
    })
    .then(geoInfo => {
      if (geoInfo[0] === "OK") {
        let time;

        if (isRandom) {
          const randomNumber = (to, from) => {
            return Math.floor(Math.random() * (to - from) + from);
          };
          time = moment.unix(randomNumber(moment().unix(), moment(new Date(2017, 4, 22)).unix()));
        } else {
          time = moment();
        }

        const randomKey = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
        const country = typeof geoInfo[1] === undefined || geoInfo[1] === '' ? '(none)' : geoInfo[1];

        const marker = {
          position: { lat: latitude, lng: longitude },
          latitude: latitude,
          longitude: longitude,
          defaultAnimation: 2,
          key: randomKey,
          country: country,
          time: time.format('HH:mm:ss MM/DD/YYYY'),
        };

        this.props.addMarker(marker);

        if (!isRandom) {
          this.show('Marker dropped! 📍', 'success', 1500)
        }
      } else {
        if (!isRandom) {
          this.show('Invalid location for a marker! 🌊', 'warning', 1500)
        }
      }
    })
    .catch(err => {
      this.show('Reverse geocoding failed. 🚫', 'error', 1500)
    });
  }
  handleMarkerRightClick(marker) {
    // TODO: remove a marker
  }
  generateRandomMarkers(event) {
    event.preventDefault();

    const getRandomInRange = (from, to, fixed) => {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    for (let i = 0; i < 100; i++) {
      const latitude = getRandomInRange(-180, 180, 7);
      const longitude = getRandomInRange(-90, 90, 7);

      setTimeout(this.generateMarker(latitude, longitude, true), 200);
    }

    this.show('Randomizing... 📍', 'success', 2500)
  }
  render() {
    return (
      <div className="section map">
        <MapDownloads
          markers={this.props.markers}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.mapLoad.bind(this)}
          onMapClick={this.dropMarker.bind(this)}
          onMarkerRightClick={this.handleMarkerRightClick.bind(this)}
        />
        <a className='generatorLink' onClick={this.generateRandomMarkers.bind(this)}>
          Generate some random data! <span role='img' aria-label='dice'>🎲</span>
        </a>
      </div>
    );
  }
}

MapsContainer.propTypes = {
  markers: PropTypes.array.isRequired,
  addMarker: PropTypes.func.isRequired,
}

export default MapsContainer;
