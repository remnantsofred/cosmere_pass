import './Navigation.css'
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { PalmIcon, BicepIcon, PortalIcon, MagicSwirlIcon, MagicStarIcon, CalendarIcon, UnlockIcon, SpellCastBoltIcon, SpellCastFireIcon, SpellCastIceIcon, SpellBookIcon, HandSparklesIcon } from '../icon/Icon';
import { FaHandSparkles } from 'react-icons/fa';


function ProfileButton({ user }) {
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
  };

  return (
    <>
      <button onClick={openMenu} className="profileButton">
        <HandSparklesIcon />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Account</li>
          <li>
            <button onClick={logout} className="logoutButton">Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;