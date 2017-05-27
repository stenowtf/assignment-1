import React, { Component } from 'react';
import Socket from './socket.js';
import Notifications, { notify } from 'react-notify-toast';

import MapsContainer from './components/maps/MapsContainer';
import ChartsContainer from './components/charts/ChartsContainer';

import './App.css';

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
  onAddMarker(marker) {
    marker.position = { lat: marker.latitude, lng: marker.longitude }
    marker.defaultAnimation = 2;

    let {markers} = this.state;
    markers.push(marker);
    this.setState({markers});
  }
  onRemoveMarker() {}
  addMarker(marker) {
    this.socket.emit('marker add', marker);
  }
  render() {
    return (
      <div className="App">
        <Notifications />
        <h1>Embrace downloads dashboard</h1>
        <MapsContainer
          {...this.state }
          addMarker={this.addMarker.bind(this)}
        />
        <ChartsContainer
          {...this.state }
        />
      </div>
    );
  }
}

export default App;
