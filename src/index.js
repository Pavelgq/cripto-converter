import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import App from "./App";

import { CurrencyProvider } from '@contexts/CurrencyContext';

ReactDOM.render(
  <React.StrictMode>
    <CurrencyProvider>
    <App />
    </CurrencyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
