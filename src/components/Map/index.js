import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import MapLegend from '../Legend';
import Markers from '../MapMarkers';

// import styled from "styled-components";
import './Map.css';

const createClusterCustomIcon = cluster => {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'f6 link dim br-pill w2 h2 pt2 dib white bg-dark-pink tc b',
    iconSize: L.point(40, 40, true),
  });
};

export default ({ center, markers, toggleLegend, legend }) => {
  return (
    <Map
      className="h-100 w-100"
      center={center}
      zoom={13}
      maxZoom={18}
      preferCanvas
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        spiderLegPolylineOptions={{ opacity: 0 }}
        spiderfyDistanceMultiplier={2.2}
      >
        <Markers markers={markers} />
      </MarkerClusterGroup>
      <MapLegend toggleLegend={toggleLegend} legend={legend} />
    </Map>
  );
};
