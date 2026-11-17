import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import NavBarHorizon from "./components/NavBarHorizon.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBarHorizon />

      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
