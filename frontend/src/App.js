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
import LocationShowPage from "./components/LocationShowPage";
import LessonDatesIndex from "./components/LessonDatesIndexPage/LessonDatesIndexPage";
import AccountPage from "./components/AccountPage";
import SearchPage from "./components/SearchPage";
import { useSelector } from "react-redux";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import AboutPage from "./components/AboutPage";
import MobileNav from "./components/MobileNav";
 

function App() {
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      
        <Switch>
          <Route path="/login">
            <Navigation />
            <LoginFormPage />
          </Route>
          <Route path="/about">
            <Navigation />
            <AboutPage className="SignupLargePanel"/>
            <MobileNav />
          </Route>
          <Route path="/signup">
            <Navigation />
            <SignupFormPage />
          </Route>
          <Route path="/account">
            <Navigation />
            <AccountPage />
            <MobileNav />
          </Route>
          <Route exact path="/search">
            <Navigation />
            <SearchPage />
            <MobileNav />
          </Route>
          <Route path="/locations/:locationId">
            <Navigation />
            <LocationShowPage />
            <MobileNav />
          </Route>

          {/* <Route exact path="/locations">
            <Navigation />
            <SearchNav />
            <LocationsIndexPage />
          </Route> */}
          {/* <Route path="/lessons/:lessonId">
            <Navigation />
          </Route> */}
          <Route exact path="/lessons">
            <Navigation />
            <LessonsIndexPage /> 
          </Route>
          {/* <Route exact path="/lessonDates">
            <Navigation />
            <SearchNav />
            <LessonDatesIndex />
          </Route> */}
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
