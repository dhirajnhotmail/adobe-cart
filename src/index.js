import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Store } from './Redux/store';
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={Store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
