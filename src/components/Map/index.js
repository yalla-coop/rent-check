import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MapLegend from '../Legend';
import Icon from '../MarkerIcon';
import L from 'leaflet';
import {
  PopupInfo,
  PopupLabel,
  CenteredSection,
  Pill,
  Button
} from './Map.styles';
// import styled from "styled-components";
import './Map.css';

type Props = {|
  _id: string,
  name: string,
  geoLocation: string,
  postcode: string,
  address: string,
  priceSqFt: number,
  useClass: string,
  leaseLength: string,
  lastRentReview: number,
  nextRentReview: number,
  squareFeet: number,
  breakClauses: string,
  useColor: object,
  annualRent: number,
  yardSqFt: number,
  yardPriceSqFt: number,
  restricted: string,
  specification: string,
  landlordName: string,
  additionalComments: string,
  landlordTenantsAct: string,
  serviceCharge: number
|};

type MarkerData = {| ...Props, key: string |};

// Date formatter //
export function formatDate(input) {
  if (input === undefined) {
    return input;
  }
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + '/' + month + '/' + year;
}
//

const iconSelect = useClass =>
  L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<Icon useClass={useClass} />)
  });

const MarkerWithPopup = ({
  _id,
  geoLocation,
  postcode,
  address,
  priceSqFt,
  useClass,
  leaseLength,
  lastRentReview,
  nextRentReview,
  squareFeet,
  breakClauses,
  yardSqFt,
  yardPriceSqFt,
  restricted,
  specification,
  landlordName,
  additionalComments,
  landlordTenantsAct,
  serviceCharge
}: Props) => {
  const price = priceSqFt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return (
    <Marker position={JSON.parse(geoLocation)} icon={iconSelect(useClass)}>
      <Popup
        offset={[33, 15]}
        keepInView={true}
        maxHeight={300}
        className={'popup'}
      >
        <div className="pa0 avenir f5 tl mw5">
          {(address || postcode) && <PopupLabel>Address:</PopupLabel>}
          <PopupInfo>
            {address}, {postcode}
          </PopupInfo>

          {landlordName && <PopupLabel>Landlord name</PopupLabel>}
          <PopupInfo>{landlordName}</PopupInfo>

          {useClass && <PopupLabel>Use Class: </PopupLabel>}
          <PopupInfo>
            <Pill useClass={useClass}>{useClass}</Pill>
          </PopupInfo>

          {squareFeet && <PopupLabel>Square Feet</PopupLabel>}
          <PopupInfo>{squareFeet}</PopupInfo>

          {yardSqFt && <PopupLabel>Yard square feet</PopupLabel>}
          <PopupInfo>{yardSqFt}</PopupInfo>

          {yardPriceSqFt && <PopupLabel>Yard price /sqft</PopupLabel>}
          <PopupInfo>{yardPriceSqFt}</PopupInfo>

          {leaseLength && <PopupLabel>Lease Length</PopupLabel>}
          <PopupInfo>{leaseLength}</PopupInfo>

          {lastRentReview && (
            <PopupLabel>Last rent review</PopupLabel>
          )}
          <PopupInfo>{formatDate(lastRentReview)}</PopupInfo>

          {nextRentReview && (
            <PopupLabel>Next rent review</PopupLabel>
          )}
          <PopupInfo>{formatDate(nextRentReview)}</PopupInfo>

          {landlordTenantsAct && (
            <PopupLabel>Landlord tenants act</PopupLabel>
          )}
          <PopupInfo>{landlordTenantsAct}</PopupInfo>

          {serviceCharge && <PopupLabel>Service charge</PopupLabel>}
          <PopupInfo>£{serviceCharge}</PopupInfo>

          {breakClauses && <PopupLabel>Break Clause</PopupLabel>}
          <PopupInfo>{breakClauses}</PopupInfo>

          {restricted && <PopupLabel>Restricted</PopupLabel>}
          <PopupInfo>{restricted}</PopupInfo>

          {specification && <PopupLabel>Specification</PopupLabel>}
          <PopupInfo>{specification}</PopupInfo>

          {additionalComments && <PopupLabel>Additional comments</PopupLabel>}
          <PopupInfo>{additionalComments}</PopupInfo>

          <CenteredSection>
            <PopupLabel>Was this useful?</PopupLabel>
            <PopupInfo>
              Help strengthen your community by adding your data
            </PopupInfo>

            <Button
              href={'https://airtable.com/shrE0QRpUy9UH8Bor'}
              target={'_blank'}
            >
              Add my data
            </Button>
          </CenteredSection>
        </div>
      </Popup>
      <Tooltip
        offset={[-20, -25]}
        className="price-icon avenir"
        direction="center"
        opacity={1}
        permanent
      >
        <div className="f6 b {price.length < 4 && ml2}">£{price}</div>
        <div className="f7 ml3">/sqft</div>
      </Tooltip>
    </Marker>
  );
};

const Markers = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MarkerWithPopup key={key} {...props} />
  ));
  return <React.Fragment>{items}</React.Fragment>;
};

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
