import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';

import Map from './Map';
import utils from '../../utils';

class MapSection extends Component {
  constructor() {
    super();

    this.show = notify.createShowQueue();
  }
  onMapLoad(map) {}
  onMapClick(event) {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    this.generateMarker(latitude, longitude, false);
  }
  generateMarker(latitude, longitude, isRandom) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude;

    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      let country;

      json.results.forEach(
        (element) => {
          if (element.types[0] === 'country' && typeof element.types[0] !== undefined && element.types[0] !== '') {
            country = element.formatted_address;
          } else {
            country = '(none)';
          }
        }
      );

      return [json.status, country];
    })
    .then(geoInfo => {
      if (geoInfo[0] === 'OK') {
        const os = utils.getRandomOS();
        const version = utils.getRandomAppVersion(os[0]);

        const marker = {
          position: { lat: latitude, lng: longitude },
          latitude: latitude,
          longitude: longitude,
          defaultAnimation: 2,
          key: utils.getRandomKey(),
          country: geoInfo[1],
          time: utils.getRandomTime(),
          os: os[1],
          version: version[1],
        };

        this.props.addDownload(marker);

        if (!isRandom) {
          this.show('Someone downloaded the app! ⭐️', 'success', 1500);
        }
      } else {
        if (!isRandom) {
          this.show('Invalid location for a download! 🌊', 'warning', 1500);
        }
      }
    })
    .catch(err => {
      this.show('Server error. 🚫', 'warning', 1500);
    });
  }
  generateRandomMarkers(event) {
    event.preventDefault();

    for (let i = 0; i < 100; i++) {
      const latitude = utils.getRandomLatitude();
      const longitude = utils.getRandomLongitude();

      setTimeout(this.generateMarker(latitude, longitude, true), 200);
    }

    this.show('People are downloading the app! 🌟✨💫', 'success', 2500);
  }
  render() {
    return (
      <div className="section map">
        <Map
          downloads={this.props.downloads}
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.onMapLoad.bind(this)}
          onMapClick={this.onMapClick.bind(this)}
        />
        <a className='generatorLink' onClick={this.generateRandomMarkers.bind(this)}>
          Generate more random data! <span role='img' aria-label='dice'>🎲</span>
        </a>
      </div>
    );
  }
}

MapSection.propTypes = {
  downloads: PropTypes.array.isRequired,
  addDownload: PropTypes.func.isRequired,
};

export default MapSection;
