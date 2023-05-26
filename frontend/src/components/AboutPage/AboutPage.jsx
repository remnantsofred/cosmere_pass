import Panels from '../panels';
import Panel from '../panel/Panel';
import './AboutPage.css';



export const AboutPage = ({id='', className="about-page"}) => {
  
  return (
    <Panel id={id} className={`${className} about-page-container`}>
      <Panels className={`${className} about-page-left-panel`}>
        <h4>About the developer & project</h4>
        <br />
        <p className='about-page-left-panel-p'>
          Hi! My name is Daphne and I am a software engineer with an HR background. I first fell in love with fitness while exploring group 
          classes through ClassPass, so when it was time to select an application to clone for our full-stack project at App Academy, I knew 
          what I wanted to clone. Additionally, I knew I wanted to add a twist to it, so I decided to theme my clone after Brandon Sanderson's 
          Cosmere universe. Thus, Cosmerepass. Brandon Sanderson is my husband's favorite author that he also got me into, so his books and 
          universe are very meaningful to me. It was a lot of fun to blend the two together.
        </p>
        <br />
        <p className='about-page-left-panel-p'>
          Cosmerepass was developed using a Ruby on Rails backend, PostgreSQL for the database, and a React/Redux frontend. It also utilizes
          the Google Maps API.
        </p>
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