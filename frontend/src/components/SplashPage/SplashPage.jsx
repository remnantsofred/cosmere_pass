import './SplashPage.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import homeImage from './homepage-hero_new_images.png'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SplashPage = ({children, id='', className="splashPage"}) => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <Panels className='splashPanels'>
      <img src={homeImage} className="homeImage" />
      <Panel className='splashMid'>
        <h1 className='splashTitle'>One app for all things magic, tactics, & investiture</h1>
        <span className='splashSpan'>
          CosmerePass gives you unlimited access to the most comprehensive collection of magic lessons. 
          Learn all the ways to shape and utilize your investiture from masters of their craft.
        </span>
        {!currentUser && <NavLink className="splashNavLink" id="splashSignUp" to="/signup">Get 1 month free</NavLink>}
        <NavLink className="splashNavLink" to="/search?start_time=0">Browse lessons</NavLink>

      </Panel>
    </Panels>
  )
}

export default SplashPage;