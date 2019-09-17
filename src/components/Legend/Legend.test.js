const { render, cleanup } = require('react-testing-library');
import React from 'react';
import Legend from '.';

afterAll(cleanup);

describe('Legend', () => {
  it('renders without crashing', () => {
    render(<Legend />);
  });
});
