import React, { Component } from 'react';
import Socket from './socket';
import Notifications from 'react-notify-toast';

import MapSection from './maps/MapSection';
import ChartsSection from './charts/ChartsSection';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloads: [],
      connected: false,
    };
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
        <h1>downloads dashboard</h1>
        <MapSection
          {...this.state}
          addDownload={this.addDownload.bind(this)}
        />
        <ChartsSection {...this.state} />
      </div>
    );
  }
}

export default App;
