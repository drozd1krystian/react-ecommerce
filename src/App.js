import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";

import { TransitionGroup, CSSTransition } from "react-transition-group";

// pages
import HomePage from "./Pages/HomePage/index";
import SignIn from "./Pages/SignIn/index";
import SignUp from "./Pages/SignUp/index";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";

// layouts
import MainLayout from "./layouts/MainLayout";
import "./style.scss";
import CheckoutPage from "./Pages/CheckoutPage";
import NotFoundTempalte from "./Templates/NotFoundTemplate";

const App = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserSession);
  }, [dispatch]);

  return (
    <div className="App">
      <TransitionGroup className="transition-group" component={null}>
        <CSSTransition
          timeout={{ enter: 300, exit: 300 }}
          classNames={"fade"}
          key={location.pathname}
        >
          <Switch location={location}>
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
            <Route
              exact
              path="/checkout"
              render={() => (
                <MainLayout>
                  <CheckoutPage />
                </MainLayout>
              )}
            ></Route>
            <Route
              exact
              path="*"
              render={() => (
                <MainLayout>
                  <NotFoundTempalte type="Page" />
                </MainLayout>
              )}
            ></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
