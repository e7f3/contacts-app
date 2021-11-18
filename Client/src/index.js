import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import DataProvider from "./context/DataContext.js";

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById("app")
);
