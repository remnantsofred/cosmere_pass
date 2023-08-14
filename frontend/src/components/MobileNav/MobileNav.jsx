import './MobileNav.css'
import Columns from '../columns/Columns';
import Column from '../column/Column';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { BiSearch, BiInfoCircle } from 'react-icons/bi'
import { GoCalendar } from 'react-icons/go'

const MobileNav = () => {
  // const sessionUser = useSelector(state => state.session.user);
  // let location = useLocation();

  return (
    <Columns className="mobile-nav" >
      <Column className='mobile-nav-col'>
        <BiSearch className='mobile-nav-icon'> <NavLink className="mobile-nav-navlink" exact to="/search" /></BiSearch>
        <NavLink className="mobile-nav-navlink" exact to="/search">
          Search
        </NavLink>
      </Column>
      <Column className='mobile-nav-col'>
        <GoCalendar className='mobile-nav-icon'><NavLink className="mobile-nav-navlink" exact to="/account" /></GoCalendar>
        <NavLink className="mobile-nav-navlink" exact to="/account">
          Upcoming
        </NavLink>
      </Column>
      <Column className='mobile-nav-col'>
        <BiInfoCircle className='mobile-nav-icon'><NavLink className="mobile-nav-navlink" exact to="/about"git  /></BiInfoCircle>
        <NavLink className="mobile-nav-navlink" exact to="/about">
          About
        </NavLink>
      </Column>
    </Columns>
  );
}

export default MobileNav;