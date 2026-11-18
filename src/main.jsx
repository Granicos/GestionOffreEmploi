import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import NavBarHorizon from "./components/NavBarHorizon.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavBarHorizon />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
