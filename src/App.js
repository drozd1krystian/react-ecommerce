import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";

// pages
import HomePage from "./Pages/HomePage/index";
import SignIn from "./Pages/SignIn/index";
import SignUp from "./Pages/SignUp/index";

// layouts
import MainLayout from "./layouts/MainLayout";
import "./style.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
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
      </Switch>
    </div>
  );
};

export default App;
