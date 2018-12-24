import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const APP_SELECTOR = "#app";
const MOUNT_NODE = document.querySelector(APP_SELECTOR);

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE);
};

if (!MOUNT_NODE) {
  console.error(`Could not find element with selector ${APP_SELECTOR}`);
} else {
  render();

  if (module.hot) {
    module.hot.accept(function() {
      render();
    });

    module.hot.dispose(function() {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    });
  }
}
