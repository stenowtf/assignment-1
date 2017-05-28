const WebSocket = class {};

const google = {
  maps: {
    Map: class {
      setOptions() {}
    },
    event: {
      addListener: () => {},
    },
  },
};

window.WebSocket = WebSocket;
window.google = google;
