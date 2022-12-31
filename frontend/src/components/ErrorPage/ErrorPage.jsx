import './ErrorPage.css'
import arm from './error_page_arm.png'
import kettlebell from './error_page_kettlebell.png'
import Panel from '../panel/Panel'
import Panels from '../panels'

export const ErrorPage = ({children, id='', className="errorPage"}) => {
  return (
    <div className={className} id={id}>
      <h1>404</h1>
        {children}
      <p>
        Whoops!
        <br />
        That's not how we wanted this to go.
      </p>
      <div className="imagePanel">
        <img src={kettlebell} alt="" id="kettlebell"/>
        <img src={arm} alt="" id="arm"/>
      </div>
    </div>  
  );
}

export default ErrorPage;