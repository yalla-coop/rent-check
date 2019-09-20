import React from 'react';
import { render } from '@testing-library/react';
import Map from '.';

const markers = [
  {
    key: 2,
    postcode: 'N4 3HH',
    address: '15 Something Street',
    priceSqFt: 9.5,
    useClass: 'A1',
    lastRentReview: '2018-05-23',
    name: 'Wish Fashion',
    geoLocation: '[51.564261,-0.108292]',
  },
  {
    key: 3,
    postcode: 'N4 3HQ',
    address: '14 Goodwin Street, London',
    priceSqFt: 15,
    useClass: 'A3',
    lastRentReview: '2018-04-01',
    name: 'Pure Cyprus',
    geoLocation: '[51.564162,-0.107777]',
  },
];

it('Map renders without crashing', () => {
  render(<Map markers={markers} />);
});
