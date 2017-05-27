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
      downloads: [],
      connected: false,
    }
    this.show = notify.createShowQueue();
  }
  componentDidMount() {
    let ws = new WebSocket('ws://localhost:4000');
    let socket = this.socket = new Socket(ws);
    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('download add', this.onAddDownload.bind(this));
  }
  onConnect() {
    this.setState({connected: true});
    this.socket.emit('map subscribe');
  }
  onDisconnect() {
    this.setState({connected: false});
  }
  onAddDownload(download) {
    download.position = { lat: download.latitude, lng: download.longitude }
    download.defaultAnimation = 2;

    let {downloads} = this.state;
    downloads.push(download);
    this.setState({downloads});
  }
  addDownload(download) {
    this.socket.emit('download add', download);
  }
  render() {
    return (
      <div className="App">
        <Notifications />
        <h1>Embrace downloads dashboard</h1>
        <MapsContainer
          {...this.state}
          addDownload={this.addDownload.bind(this)}
        />
        <ChartsContainer {...this.state} />
      </div>
    );
  }
}

export default App;
