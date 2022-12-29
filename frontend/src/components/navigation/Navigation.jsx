import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Row from '../row/Row';
import Rows from '../rows/Rows';
import Column from '../column/Column';
import Columns from '../columns/Columns';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <Columns>
      <ul>
        
        <li>
          <Column><NavLink exact to="/">Home</NavLink></Column>
          <Column>{sessionLinks}</Column>
        </li>
        
      </ul>
    </Columns>
  );
}

export default Navigation;