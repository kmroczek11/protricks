import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";

// const rootElement = document.getElementById("root");

// if (!rootElement) throw new Error("Failed to find the root element");

// const root = createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <Router>
//       <CssBaseline />
//       <App />
//     </Router>
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
