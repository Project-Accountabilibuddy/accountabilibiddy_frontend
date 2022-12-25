import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth, Amplify } from "aws-amplify";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
