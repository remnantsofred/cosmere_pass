import './SplashPage.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import homeImage from './homepage-hero_desktop.jpeg'


export const SplashPage = ({children, id='', className="splashPage"}) => {

  return (
    <Panels className='splashPanels'>
      <img src={homeImage} className="homeImage" />
      
    </Panels>
  )
}

export default SplashPage;