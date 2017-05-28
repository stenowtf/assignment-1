import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import MapSection from './components/maps/MapSection.js';
import Map from './components/maps/Map.js';
import ChartsSection from './components/charts/ChartsSection.js';
import ChartByCountry from './components/charts/ChartByCountry';
import ChartByTime from './components/charts/ChartByTime';
import ChartByOS from './components/charts/ChartByOS';
import ChartByAppVersion from './components/charts/ChartByAppVersion';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('MapSection renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MapSection
      downloads={[]}
      addDownload={()=>{}}
    />,
    div
  );
});

it('Map renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Map
      containerElement={<div />}
      mapElement={<div />}
      downloads={[]}
      onMapLoad={()=>{}}
      onMapClick={()=>{}}
    />,
    div
  );
});

it('ChartsSection renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartsSection
      downloads={[]}
    />,
    div
  );
});

it('ChartByCountry renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartByCountry
      downloads={[]}
    />,
    div
  );
});

it('ChartByTime renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartByTime
      downloads={[]}
    />,
    div
  );
});

it('ChartByOS renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartByOS
      downloads={[]}
    />,
    div
  );
});

it('ChartByAppVersion renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartByAppVersion
      downloads={[]}
    />,
    div
  );
});

