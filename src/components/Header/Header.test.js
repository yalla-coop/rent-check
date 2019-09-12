const { render, cleanup } = require('react-testing-library');
import React from 'react';
import Header from '.';

afterAll(cleanup);

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });
});
