const { render, cleanup } = require('./node_modules/react-testing-library');
import React from './node_modules/react';
import Legend from '.';

afterAll(cleanup);

describe('Legend', () => {
  it('renders without crashing', () => {
    render(<Legend />);
  });
});
