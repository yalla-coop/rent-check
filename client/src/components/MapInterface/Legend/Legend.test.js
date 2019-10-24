import React from 'react';
import Legend from '.';

const { render, cleanup } = require('@testing-library/react');

afterAll(cleanup);

describe('Legend', () => {
  it('renders without crashing', () => {
    render(<Legend />);
  });
});
