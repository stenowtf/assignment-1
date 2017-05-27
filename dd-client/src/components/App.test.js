import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

import App from './App';

const google = {
  maps: {
    Map: class {
      setOptions() {}
    },
  },
};

const WebSocket = class {};

window.google = google;
window.WebSocket = WebSocket;

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
