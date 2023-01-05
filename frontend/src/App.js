import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/navigation/Navigation";
import ErrorPage from "./components/ErrorPage";
import SplashPage from "./components/SplashPage";
import LessonsIndexPage from "./components/LessonsIndexPage/LessonsIndexPage";
import SearchNav from "./components/SearchNav";
import LocationsIndexPage from "./components/LocationsIndexPage/LocationsIndexPage";

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
          <Route path="/search">
            <Navigation />
            {/* make search page - LessonDatesIndex */}
          </Route>
          <Route path="/locations/:location_id">
            <Navigation />
            {/* make search page - LocationsShow page*/}
          </Route>
          <Route exact path="/locations">
            <Navigation />
            <SearchNav />
            <LocationsIndexPage />
            {/* make search page - LocationsIndex*/}
          </Route>
          <Route path="/lessons/:lesson_id">
            <Navigation />
            {/* make search page - lesson show*/}
          </Route>
          <Route exact path="/lessons/">
            <Navigation />
            <SearchNav />
            <LessonsIndexPage /> 
            {/* make search page - Lesson index*/}
          </Route>
          <Route path="/error">
            <Navigation />
            <ErrorPage />
          </Route>
          <Route exact path="/" >
            <Navigation />
            <SplashPage />  
          </Route>
          <Redirect to='/error' />
        </Switch>
    </>    
  );
}

export default App;
