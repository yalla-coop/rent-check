const { render, cleanup } = require('react-testing-library');
import React from 'react';
import Landing from '.';

afterAll(cleanup);

describe('Landing', () => {
  it('renders without crashing', () => {
    render(<Landing />);
  });
});
