const { render, cleanup } = require("@testing-library/react");
import React from "react";
import Header from ".";

afterAll(cleanup);

describe("Header", () => {
  it("renders without crashing", () => {
    render(<Header />);
  });
});
