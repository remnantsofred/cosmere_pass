import './SplashPage.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import homeImage from './homepage-hero_desktop.jpeg'
import { NavLink } from 'react-router-dom';

export const SplashPage = ({children, id='', className="splashPage"}) => {

  return (
    <Panels className='splashPanels'>
      <img src={homeImage} className="homeImage" />
      <Panel className='splashMid'>
        <h1 className='splashTitle'>One app for all things magic, tactics, & investiture</h1>
        <span className='splashSpan'>
          CosmerePass gives you galaxy-wide access to hundreds of top-rated gyms, fitness studios, salons and spas.
        </span>
        <NavLink className="splashNavLink" id="splashSignUp" to="/signup">Get 1 month free</NavLink>
        <NavLink className="splashNavLink" to="/search">Browse lessons</NavLink>

      </Panel>
    </Panels>
  )
}

export default SplashPage;