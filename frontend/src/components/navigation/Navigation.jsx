import './Navigation.css';
import Rows from '../rows/Rows';
import Row from '../row/Row';
import React, { useEffect, useState } from 'react';
import ProfileButton from './ProfileButton';
import logo from './classpass.svg';
import Icon from '../icon/Icon';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';


function Navigation({id}) {
  const sessionUser = useSelector(state => state.session.user);
  let location = useLocation();

  const startSessionLinks = (
    <>
        <NavLink className="navNavLink" id="findClasses" to="/search">Find lessons</NavLink>
        <NavLink className="navNavLink" id="aboutPage" to="/about">About</NavLink>
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
    <Columns className="NavColumns" >
      
          {/* <Column><NavLink id="NavLink" exact to="/">Home</NavLink></Column> */}
          <Column>
            <NavLink className="navNavLinkLogoName" exact to="/">
              {/* <img className="img-responsive" src={logo} alt="logo"/> */}
              cosmerepass
            </NavLink>
          </Column>
          <Column>
            {sessionLinks}
          </Column>
     
    </Columns>
  );
}

export default Navigation;