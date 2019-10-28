import React from "react";
import PostcodeForm from ".";

const { render, cleanup } = require("@testing-library/react");

afterAll(cleanup);

describe("PostcodeForm", () => {
  const searchInput = "";
  it("renders without crashing", () => {
    render(
      <PostcodeForm
        onSubmit={jest.fn()}
        postcode={searchInput}
        onChange={jest.fn()}
        showWarning={false}
      />
    );
  });
  it("renders with a warning", () => {
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
