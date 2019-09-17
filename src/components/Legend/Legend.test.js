const { render, cleanup } = require("@testing-library/react");
import React from "react";
import Legend from ".";

afterAll(cleanup);

describe("Legend", () => {
  it("renders without crashing", () => {
    render(<Legend />);
  });
});
