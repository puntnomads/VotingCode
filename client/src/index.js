import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { Router } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-redux-loading-bar";
import history from "./history";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import theme from "./assets/react-toolbox/theme";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import IndexReducer from "./index-reducer";
import IndexSagas from "./index-sagas";

const sagaMiddleware = createSagaMiddleware();

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)) // allows redux devtools to watch sagas
);

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <div>
          <LoadingBar
            showFastActions
            style={{
              backgroundColor: "red",
              height: "5px",
              position: "absolute",
              zIndex: "1"
            }}
          />
          <ToastContainer />
          <NavBar />
          <Main />
        </div>
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
