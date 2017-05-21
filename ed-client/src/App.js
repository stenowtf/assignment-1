import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import moment from 'moment';
import Socket from './socket.js';
import { VictoryPie } from 'victory-pie';
import { VictoryTheme, VictoryTooltip } from 'victory-core';
import { VictoryChart, VictoryBar } from 'victory-chart';
import Notifications, { notify } from 'react-notify-toast';
import './App.css';

const DownloadsGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={1}
    defaultCenter={{ lat: 0, lng: 0 }}
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

class ChartDownloads extends Component {
  render() {
    const {markers} = this.props;
    let countries = [];

    markers.forEach(marker => {
      let found = countries.find((element) => {
        return element.country === marker.country;
      });

      if (found === undefined) {
        countries.push({
          country: marker.country,
          total: 1,
        });
      } else {
        let foundIndex = countries.findIndex((element) => {
          return element.country === marker.country;
        });
        countries[foundIndex] = {
          country: found.country,
          total: found.total + 1,
        }
      }
    });

    return (
      <VictoryPie
        theme={VictoryTheme.material}
        style={{ parent: {border: "2px dotted #ccc"} }}
        labelComponent={
          <VictoryTooltip
            style={{
              fontSize: 10,
            }}
            flyoutStyle={{
              stroke: "black",
              fill: "white",
            }}
          />
        }
        labels={(c) => c.country + ': ' + c.total}
        data={countries}
        x="country"
        y="total"
        colorScale="qualitative"
        sortKey={["total", "country"]}
        padding={80}
        padAngle={1}
        innerRadius={10}
        startAngle={90}
        endAngle={450}
      >
      </VictoryPie>
    );
  }
}

class ChartTimeOfDay extends Component {
  render() {
    const {markers} = this.props;

    let timesOfDay = [
      { time: 'Morning', total: 0 },
      { time: 'Afternoon', total: 0 },
      { time: 'Evening', total: 0 },
    ];

    markers.forEach(marker => {
      let timeOfDay;
      let hour = moment(marker.time, 'HH:mm:ss MM/DD/YYYY').hour();

      if (hour <= 12) {
        timeOfDay = 'Morning';
      } else if (hour <= 18) {
        timeOfDay = 'Afternoon';
      } else {
        timeOfDay = 'Evening';
      }

      timesOfDay.forEach(t => {
        if (t.time === timeOfDay) {
          t.total += 1;
        }
      });
    });

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        style={{ parent: {border: "2px dotted #ccc"} }}
      >
        <VictoryBar
          style={{
            data: {
              fill: (t) => {
                if (t.time === 'Morning') {
                  return 'red';
                }
                else if (t.time === 'Afternoon') {
                  return 'green';
                }
                return 'blue';
              },
              width: 20,
            },
          }}
          data={timesOfDay}
          x='time'
          y='total'
        />
      </VictoryChart>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      connected: false,
    }
    this.show = notify.createShowQueue();
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

    this.generateMarker(lat, lng, true);
  }
  generateMarker(lat, lng, doNotify) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng

    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      let newMarkerCountry;

      json.results.forEach(
        (element) => {
          if (element.types[0] === 'country') {
            newMarkerCountry = element.formatted_address;
          }
        }
      );

      return [json.status, newMarkerCountry];
    })
    .then(geoInfo => {
      if (geoInfo[0] === "OK") {
        const marker = {
          position: { lat: lat, lng: lng },
          latitude: lat,
          longitude: lng,
          defaultAnimation: 2,
          key: moment().format('x'),
          country: geoInfo[1] !== '' ? geoInfo[1] : '(none)',
          time: moment().format('HH:mm:ss MM/DD/YYYY'),
        };

        this.socket.emit('marker add', marker);

        if (doNotify) {
          this.show('Marker dropped! 📍', 'success', 1500)
        }
      } else {
        if (doNotify) {
          this.show('Invalid location for a marker! 🌊', 'warning', 1500)
        }
      }
    })
    .catch(err => {
      this.show('Reverse geocoding failed. 🚫', 'error', 1500)
    });
  }
  onAddMarker(marker) {
    marker.position = { lat: marker.latitude, lng: marker.longitude }
    marker.defaultAnimation = 2;

    let {markers} = this.state;
    markers.push(marker);
    this.setState({markers});
  }
  onRemoveMarker() {}
  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    // const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    // this.setState({
    //   markers: nextMarkers,
    // });
  }
  onFakeDataClick(event) {
    event.preventDefault();

    const getRandomInRange = (from, to, fixed) => {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    for (let i = 0; i < 200; i++) {
      const lat = getRandomInRange(-180, 180, 7);
      const lng = getRandomInRange(-90, 90, 7);

      setTimeout(this.generateMarker(lat, lng, false), 100);
    }
  }

  render() {
    return (
      <div className="App">
        <Notifications />
        <h1>Embrace downloads dashboard</h1>
        <div className="section map">
          <DownloadsGoogleMap
            markers={this.state.markers}
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={this.handleMapLoad.bind(this)}
            onMapClick={this.handleMapClick.bind(this)}
            onMarkerRightClick={this.handleMarkerRightClick.bind(this)}
          />
          <a onClick={this.onFakeDataClick.bind(this)}>
            Generate some fake data!
          </a>
        </div>
        <div className="section chart-countries">
          <h3>Number of downloads (by country)</h3>
          <ChartDownloads {...this.state} />
        </div>
        <div className="section chart-times-of-day">
          <h3>Number of downloads (by times of the day)</h3>
          <ChartTimeOfDay {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
