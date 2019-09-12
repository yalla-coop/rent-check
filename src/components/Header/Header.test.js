const { render, cleanup } = require('./node_modules/react-testing-library');
import React from './node_modules/react';
import Header from '.';

afterAll(cleanup);

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });
});
