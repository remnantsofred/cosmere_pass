import './Navigation.css'
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { PalmIcon, BicepIcon, PortalIcon, MagicSwirlIcon, MagicStarIcon, CalendarIcon, UnlockIcon, SpellCastBoltIcon, SpellCastFireIcon, SpellCastIceIcon, SpellBookIcon, HandSparklesIcon } from '../icon/Icon';
import { FaHandSparkles } from 'react-icons/fa';
import { NavLink, Redirect, withRouter } from 'react-router-dom';


const ProfileButton = withRouter(({ user, history }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button onClick={openMenu} className="profileButton">
        <HandSparklesIcon />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <NavLink to={`/account`} className="AccountLink" >Account</NavLink> */}
          <li>
            <button onClick={logout} className="logoutButton">Log Out</button>
            
          </li>
        </ul>
      )}
    </>
  );
})

export default ProfileButton;