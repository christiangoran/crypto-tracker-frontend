import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "../NavBar";
@jest-environment node

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
});
