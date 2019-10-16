import React from 'react';
import Landing from '.';

const { render, cleanup } = require('@testing-library/react');

afterAll(cleanup);

describe('Landing', () => {
  it('renders without crashing', () => {
    render(<Landing />);
  });
});
