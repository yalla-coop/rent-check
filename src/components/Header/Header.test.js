import React from 'react';
import Header from '.';

const { render, cleanup } = require('@testing-library/react');

afterAll(cleanup);

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });
});
