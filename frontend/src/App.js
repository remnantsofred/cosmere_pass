import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/navigation/Navigation";
import ErrorPage from "./components/ErrorPage";


function App() {
  return (
    <>
      
        <Switch>
          <Route path="/login">
            <Navigation />
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <Navigation />
            <SignupFormPage />
          </Route>
          <Route path="/error">
            <Navigation />
            <ErrorPage />
          </Route>
          <Route  exact path="/" >
            <Navigation />
          </Route>
          <Redirect to='/error' />
        </Switch>
    </>    
  );
}

export default App;
