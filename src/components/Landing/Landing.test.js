const { render, cleanup } = require("@testing-library/react");
import React from "react";
import Landing from ".";

afterAll(cleanup);

describe("Landing", () => {
  it("renders without crashing", () => {
    render(<Landing />);
  });
});
