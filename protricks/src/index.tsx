import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
