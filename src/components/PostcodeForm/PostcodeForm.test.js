const { render, cleanup } = require('./node_modules/react-testing-library');
import React from './node_modules/react';
import PostcodeForm from '.';

afterAll(cleanup);

describe('PostcodeForm', () => {
  let searchInput = '';
  it('renders without crashing', () => {
    render(
      <PostcodeForm
        onSubmit={jest.fn()}
        postcode={searchInput}
        onChange={jest.fn()}
        showWarning={false}
      />
    );
  });
  it('renders with a warning', () => {
    render(
      <PostcodeForm
        onSubmit={jest.fn()}
        postcode={searchInput}
        onChange={jest.fn()}
        showWarning="Test Warning"
      />
    );
  });
});
