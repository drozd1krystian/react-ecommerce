import React from "react";
import { Route, Switch } from "react-router-dom";

import "./style.scss";

// pages
import HomePage from "./components/HomePage/index";
import Registration from "./components/Registration/index";

// layouts
import MainLaout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLaout>
              <HomePage />
            </MainLaout>
          )}
        ></Route>
        <Route
          exact
          path="/registration"
          render={() => (
            <MainLaout>
              <Registration />
            </MainLaout>
          )}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
