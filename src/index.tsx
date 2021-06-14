import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { StoreProvider } from "./store/storeContext";
import { RootStore } from "./store/RootStore";

const store = new RootStore();
console.log(store);

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);
