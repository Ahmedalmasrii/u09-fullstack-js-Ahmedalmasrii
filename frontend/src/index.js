import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Om du har en CSS-fil

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
