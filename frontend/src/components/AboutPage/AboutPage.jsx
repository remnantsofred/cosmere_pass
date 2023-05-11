import Panels from '../panels';
import Panel from '../panel/Panel';
import './AboutPage.css';



export const AboutPage = ({id='', className="about-page"}) => {
  
  return (
    <Panel id={id} className={`${className} about-page-container`}>
      <Panels className={`${className} about-page-left-panel`}>
        Hi! My name is Daphne 
        
        <br />
        <br />
        <br />
        <a href="https://www.linkedin.com/in/lamdaphne/" target="_blank" className="navNavLink" >LinkedIn</a>
        <a href="https://remnantsofred.github.io/" target="_blank" className="navNavLink">Portfolio</a>
        <a href="https://github.com/remnantsofred/cosmere_pass" target="_blank" className="navNavLink">Github</a>
      </Panels>
      {/* <Panels className={`${className} about-page-right-panel`}>
        Hi I am the right panel
      </Panels> */}

    </Panel>
  )

}

export default AboutPage