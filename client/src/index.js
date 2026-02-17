import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="810360116396-lvrh7jbtnh44qqdft2nf2r82vjns69ku.apps.googleusercontent.com">
    <AppProvider>
      <App />
    </AppProvider>
  </GoogleOAuthProvider>
);
