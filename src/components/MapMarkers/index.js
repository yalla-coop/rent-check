import React from "react"
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import Icon from '../MarkerIcon';
import {
  PopupInfo,
  PopupLabel,
  CenteredSection,
  Pill,
  Button
} from './MapMarkers.styles';

type MarkerData = {|
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
}: MarkerData) => {
  const iconSelect = useClass =>
  L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<Icon useClass={useClass} />)
  });
  // Date formatter //
  const formatDate = input => {
    if (input === undefined) {
      return input;
    }
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];
  return day + '/' + month + '/' + year;
}
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
  const items = markers.map(({ _id, ...props }) => (
    <MarkerWithPopup key={_id} {...props} />
  ));
  return <React.Fragment>{items}</React.Fragment>;
};

export default Markers;