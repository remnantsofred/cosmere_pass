import './ErrorPage.css'
import arm from './error_page_arm.png'
import kettlebell from './error_page_kettlebell.png'
import Panel from '../panel/Panel'
import Panels from '../panels'
import Column from '../column/Column'

export const ErrorPage = ({children, id='', className="errorPage"}) => {
  return (

    <div className={className} id={id}>
        
          <img src={arm} alt="" id="arm"/>
 
          <div className='errorSection'>
            <h1 className='errorMsg'>404</h1>
            <p className='whoops'>
              Whoops!
              <br />
              That's not how we wanted this to go.
            </p>
          </div>
          <img src={kettlebell} alt="" id="kettlebell"/>
      
    </div>
     
  );
} 

export default ErrorPage;