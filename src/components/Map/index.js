import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MapLegend from '../Legend';
import L from 'leaflet';
import Markers from "../MapMarkers";

// import styled from "styled-components";
import './Map.css';

const createClusterCustomIcon = function(cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'f6 link dim br-pill w2 h2 pt2 dib white bg-dark-pink tc b',
    iconSize: L.point(40, 40, true)
  });
};

export default props => {
  return (
    <Map
      className="h-100 w-100"
      center={props.center}
      zoom={13}
      maxZoom={18}
      preferCanvas={true}
    >
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        spiderLegPolylineOptions={{ opacity: 0 }}
        spiderfyDistanceMultiplier={2.2}
      >
        <Markers markers={props.markers} />
      </MarkerClusterGroup>
      <MapLegend toggleLegend={props.toggleLegend} legend={props.legend} />
    </Map>
  );
};
