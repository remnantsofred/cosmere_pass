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
        <img src="../../assets/daphne_photo.png" alt="" />
        <p className='about-page-header-2'>
          Hi! My name is Daphne and I am a software engineer with an HR background, and I am passionate about movement. 
        </p>
          
        <p className='about-page-left-panel-p'>
          I have always loved movement of all kinds, but that realization did not crystalize for me until I got into fitness. 
          I first fell in love with fitness while exploring group 
          classes through ClassPass, so when it was time to select an application to clone for our full-stack project at App Academy, I immediately knew 
          what I wanted to clone. I also wanted to add a twist to it, so I decided to theme my clone after Brandon Sanderson's 
          Cosmere universe. Brandon Sanderson is my husband's favorite author that he also got me into, so his books and 
          universe are very meaningful to me. Thus, ✨ Cosmerepass ✨. It was a lot of fun to blend the two together.
        </p>
       
        <p className='about-page-left-panel-p'>
          Cosmerepass was developed using a Ruby on Rails backend, PostgreSQL for the database, and a React/Redux frontend. It also utilizes
          the Google Maps API.
        </p>
        <p className='about-page-left-panel-p'>
          If you'd like to connect, check out my LinkedIn below or email me at <a href="mailto:d.huff.lam@gmail.com?subject=Hi! I found you through your project Cosmerepass">d.huff.lam@gmail.com</a>.
        </p>

        <br />
        <br />
        <Row>
          <a href="https://www.linkedin.com/in/lamdaphne/" target="_blank" className="navNavLink" >LinkedIn</a>
          <a href="https://remnantsofred.github.io/" target="_blank" className="navNavLink">Portfolio</a>
          <a href="https://github.com/remnantsofred/cosmere_pass" target="_blank" className="navNavLink">Github</a>
        </Row>
      </Panels>
    

    </Panel>
  )

}

export default AboutPage