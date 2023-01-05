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

  const startSessionLinks = (
    <>
        <NavLink className="navNavLink" id="findClasses" to="/lessons">Find lessons</NavLink>
        <a href="https://www.linkedin.com/in/lamdaphne/" target="_blank" className="navNavLink" id="aboutMe" to="/search">About me</a>
        <NavLink className="navNavLink" id="loginNav" to="/login">Log in</NavLink>
        <NavLink className="navNavLink" id="signupNav" to="/signup">Get 1 month free</NavLink>
    </>
  )
  
  const [sessionLinks, setSessionLinks] = useState(startSessionLinks);
   


  
  useEffect(()=>{
    
    // if I'm not logged in and I'm not on the login page, show the login and signup links
    if((!location.pathname.includes('/login')  && !location.pathname.includes('/signup')) && !sessionUser){
      setSessionLinks(startSessionLinks)
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


  return (
    <Columns id="NavColumns">
      
          {/* <Column><NavLink id="NavLink" exact to="/">Home</NavLink></Column> */}
          <Column>
            <NavLink className="navNavLink" exact to="/">
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