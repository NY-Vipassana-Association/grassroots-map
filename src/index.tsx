import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const APP_SELECTOR = "#root";
const MOUNT_NODE = document.querySelector(APP_SELECTOR);

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE);
};

render();
