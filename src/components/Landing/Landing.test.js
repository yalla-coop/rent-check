const { render, cleanup } = require('./node_modules/react-testing-library');
import React from './node_modules/react';
import Landing from '.';

afterAll(cleanup);

describe('Landing', () => {
  it('renders without crashing', () => {
    render(<Landing />);
  });
});
