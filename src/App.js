import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";

// pages
import HomePage from "./Pages/HomePage/index";
import SignIn from "./Pages/SignIn/index";
import Registration from "./Pages/SignUp/index";

// layouts
import MainLayout from "./layouts/MainLayout";
import "./style.scss";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;
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

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, [setCurrentUser]);

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
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <SignIn />
              </MainLayout>
            )
          }
        ></Route>
        <Route
          exact
          path="/signup"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        ></Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
