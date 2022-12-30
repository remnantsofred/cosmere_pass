import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Row from '../row/Row';
import Rows from '../rows/Rows';
import Column from '../column/Column';
import Columns from '../columns/Columns';
import Icon from '../icon/Icon';
import logo from './classpass.svg';


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  let location = useLocation();

  const [sessionLinks, setSessionLinks] = useState(<>
    <NavLink className="NavLink" id="loginNav" to="/login">Log In</NavLink>
    <NavLink className="NavLink" id="signupNav" to="/signup">Sign Up</NavLink>
  </>);
  console.log('location', location)

  useEffect(()=>{
    
    // if I'm not logged in and I'm not on the login page, show the login and signup links
    if((!location.pathname.includes('/login')  && !location.pathname.includes('/signup')) && !sessionUser){
      setSessionLinks(
      <>
        <NavLink className="NavLink" id="loginNav" to="/login">Log In</NavLink>
        <NavLink className="NavLink" id="signupNav" to="/signup">Sign Up</NavLink>
      </>)
      // if I'm logged in OR i'm on the login or signup page, do not show the login and signup links
      // if i'm logged in show the profile button
    } else if (sessionUser){
        setSessionLinks(
          <>
            <ProfileButton user={sessionUser} />
          </>)
      
    } else {
      setSessionLinks(<></>)
    }
  }, [location.pathname, sessionUser])


  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   if (href !== 'http://localhost:3000/login'){
  //     sessionLinks = (
  //     <>
  //       <NavLink className="NavLink" id="loginNav" to="/login">Log In</NavLink>
  //       <NavLink className="NavLink" id="signupNav" to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  //   }
  // }

  return (
    <Columns id="NavColumns">
      
          {/* <Column><NavLink id="NavLink" exact to="/">Home</NavLink></Column> */}
          <Column>
            <NavLink className="NavLink" exact to="/">
              <img className="img-responsive" src={logo} alt="logo"/>
            </NavLink>
          </Column>
          <Column>
            {sessionLinks}
          </Column>
     
    </Columns>
  );
}

export default Navigation;