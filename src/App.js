import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";

// pages
import HomePage from "./Pages/HomePage/index";
import SignIn from "./Pages/SignIn/index";
import SignUp from "./Pages/SignUp/index";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";

// layouts
import MainLayout from "./layouts/MainLayout";
import "./style.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession);
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLayout>
              <HomePage />
            </MainLayout>
          )}
        ></Route>
        <Route
          exact
          path="/product/:productId"
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}
        ></Route>
        <Route
          exact
          path="/signin"
          render={() => (
            <MainLayout>
              <SignIn />
            </MainLayout>
          )}
        ></Route>
        <Route
          exact
          path="/signup"
          render={() => (
            <MainLayout>
              <SignUp />
            </MainLayout>
          )}
        ></Route>
        <Route
          exact
          path="/cart"
          render={() => (
            <MainLayout>
              <CartPage />
            </MainLayout>
          )}
        ></Route>
      </Switch>
    </div>
  );
};

export default App;
