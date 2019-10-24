/* eslint-disable */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { NavLink } from 'react-router-dom';
import L from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import Icon from '../MarkerIcon';
import {
  PopupInfo,
  PopupLabel,
  CenteredSection,
  Pill,
  Button,
} from './MapMarkers.styles';

type MarkerData = {|
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
  annualRent: number,
  yardSqFt: number,
  yardPriceSqFt: number,
  restricted: string,
  specification: string,
  landlordName: string,
  additionalComments: string,
  landlordTenantsAct: string,
  serviceCharge: number,
|};

const MarkerWithPopup = ({
  geoLocation,
  postcode,
  address,
  annualRent,
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
  serviceCharge,
}: MarkerData) => {
  const iconSelect = () =>
    L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(<Icon useClass={useClass} />),
    });
  // Date formatter //
  const formatDate = input => {
    if (input === undefined) {
      return input;
    }
    const datePart = input.match(/\d+/g);
    const year = datePart[0].substring(2); // get only two digits
    const month = datePart[1];
    const day = datePart[2];
    return `${day}/${month}/${year}`;
  };
  const price = priceSqFt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  // leaflet use latlong but mongodb use longlat coordinates
  const { coordinates } = geoLocation;
  return (
    <Marker
      position={[coordinates[1], coordinates[0]]}
      icon={iconSelect(useClass)}
    >
      <Popup offset={[33, 15]} keepInView maxHeight={300} className="popup">
        <div className="pa0 avenir f5 tl mw5">
          {(address || postcode) && (
            <>
              <PopupLabel>Address</PopupLabel>
              <PopupInfo>
                {address}, {postcode}
              </PopupInfo>
            </>
          )}
          {landlordName && (
            <>
              <PopupLabel>Landlord Name</PopupLabel>
              <PopupInfo>{landlordName}</PopupInfo>
            </>
          )}
          {useClass && (
            <>
              <PopupLabel>Use Class</PopupLabel>
              <PopupInfo>
                <Pill useClass={useClass}>{useClass}</Pill>
              </PopupInfo>
            </>
          )}
          {annualRent && (
            <>
              <PopupLabel>Annual Rent</PopupLabel>
              <PopupInfo>£{annualRent}</PopupInfo>
            </>
          )}
          {squareFeet && (
            <>
              <PopupLabel>Square Feet</PopupLabel>
              <PopupInfo>{squareFeet}</PopupInfo>
            </>
          )}
          {priceSqFt && (
            <>
              <PopupLabel>Price /sqft</PopupLabel>
              <PopupInfo>£{priceSqFt}</PopupInfo>
            </>
          )}
          {yardSqFt && (
            <>
              <PopupLabel>Yard Square Feet</PopupLabel>
              <PopupInfo>{yardSqFt}</PopupInfo>
            </>
          )}
          {yardPriceSqFt && (
            <>
              <PopupLabel>Yard Price /sqft</PopupLabel>
              <PopupInfo>£{yardPriceSqFt}</PopupInfo>
            </>
          )}
          {leaseLength && (
            <>
              <PopupLabel>Lease Length</PopupLabel>
              <PopupInfo>{leaseLength}</PopupInfo>
            </>
          )}
          {lastRentReview && (
            <>
              <PopupLabel>Last rent review</PopupLabel>
              <PopupInfo>{formatDate(lastRentReview)}</PopupInfo>
            </>
          )}
          {nextRentReview && (
            <>
              <PopupLabel>Next rent review</PopupLabel>
              <PopupInfo>{formatDate(nextRentReview)}</PopupInfo>
            </>
          )}
          {landlordTenantsAct && (
            <>
              <PopupLabel>Landlord tenants act</PopupLabel>
              <PopupInfo>{landlordTenantsAct}</PopupInfo>
            </>
          )}
          {serviceCharge && (
            <>
              <PopupLabel>Service charge</PopupLabel>
              <PopupInfo>£{serviceCharge}</PopupInfo>
            </>
          )}
          {breakClauses && (
            <>
              <PopupLabel>Break Clause</PopupLabel>
              <PopupInfo>{breakClauses}</PopupInfo>
            </>
          )}
          {restricted && (
            <>
              <PopupLabel>Restricted</PopupLabel>
              <PopupInfo>{restricted}</PopupInfo>
            </>
          )}
          {specification && (
            <>
              <PopupLabel>Specification</PopupLabel>
              <PopupInfo>{specification}</PopupInfo>
            </>
          )}
          {additionalComments && (
            <>
              <PopupLabel>Additional comments</PopupLabel>
              <PopupInfo>{additionalComments}</PopupInfo>
            </>
          )}

          <CenteredSection>
            <PopupLabel>Was this useful?</PopupLabel>
            <PopupInfo>
              Help strengthen your community by adding your data
            </PopupInfo>
            <NavLink to="/add-rental-data">
              <Button>Add my data</Button>
            </NavLink>
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
  const items = markers.map(({ _id, ...props }) => (
    <MarkerWithPopup key={_id} {...props} />
  ));
  return <React.Fragment>{items}</React.Fragment>;
};

export default Markers;
