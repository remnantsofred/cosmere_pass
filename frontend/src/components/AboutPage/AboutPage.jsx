import Panels from '../panels';
import Panel from '../panel/Panel';
import './AboutPage.css';
import Row from '../row/Row';



export const AboutPage = ({id='', className="about-page"}) => {
  
  return (
    <Panel id={id} className='about-page-container'>
      <Panels className='about-page-left-panel'>
        <h4 className='about-page-header'>About the developer & project</h4>
        <br />
        <p className='about-page-mini-header'>Who are you?</p>
        <p className='about-page-header-2'>
          Hi! My name is Daphne Lam and I am a software engineer with an HR background who is passionate about movement. 
        </p>
        <p className='about-page-mini-header'>Why clone ClassPass?</p> 
        <p className='about-page-left-panel-p'>
          I have always loved movement of all types, but that realization did not crystalize for me until I got into fitness. 
          I first fell in love with fitness while exploring group 
          classes through ClassPass, so when it was time to select an application to clone for our full-stack project at App Academy, I immediately knew 
          what I wanted to clone. I also wanted to add a twist to it, so I decided to theme my clone after Brandon Sanderson's 
          Cosmere universe. Thus, ✨<b><i>Cosmerepass</i></b>✨. It was a lot of fun to blend the two together.
        </p>
       
        <p className='about-page-mini-header'>What is the tech stack?</p> 
        <p className='about-page-left-panel-p'>
          Cosmerepass was developed using a Ruby on Rails backend, PostgreSQL for the database, and a React/Redux frontend. It also utilizes
          the Google Maps API. Read more about Cosmerepass' features and development at the project's Github link below.
        </p>
        <p className='about-page-mini-header'>Tell me more!</p> 
        <p className='about-page-left-panel-p'>
           Connect with me via LinkedIn, visit my portolfio site, or email me at <a className='about-page-a' href="mailto:d.huff.lam@gmail.com?subject=Hi! I found you through your project Cosmerepass">d.huff.lam@gmail.com</a>. 😊
        </p>

        <br />
        <br />
        <Row>
          <a href="https://www.linkedin.com/in/lamdaphne/" target="_blank" className="navNavLink" id='signupNav'>LinkedIn  </a>
          <a href="https://remnantsofred.github.io/" target="_blank" className="navNavLink" id='signupNav'>Portfolio</a>
          <a href="https://github.com/remnantsofred/cosmere_pass" target="_blank" className="navNavLink" id='signupNav'>Github</a>
        </Row>
      </Panels>
    

    </Panel>
  )

}

export default AboutPage