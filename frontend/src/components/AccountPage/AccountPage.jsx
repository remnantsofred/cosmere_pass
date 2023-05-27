import './AccountPage.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import Row from '../row/Row';
import { useSelector } from 'react-redux';

export const AccountPage = () => {
  const currentUser = useSelector(state => state.session.user);


  return(
    <Panel className='acct-page-container'>
      <Panels className='acct-page-panel-L'>
        <Row className='acct-page-title-row-welcome-banner'>Welcome back, <h6 className='username-header'>{currentUser.username}</h6></Row>
        <ul className='acct-page-title-ul'>
          <li className='acct-page-title-li'>
            <p>Upcoming reservations</p>
          </li>
          <li className='acct-page-title-li'>
            <p>Past reservations</p>
          </li>
          <li className='acct-page-title-li'>
            <p>Favorites</p>
          </li>
          <li className='acct-page-title-li'>
            <p>Reviews</p>
          </li>
        </ul>
      </Panels>
      <Panels className='acct-page-panel-R'>
        <div className='acct-page-main-content-container'>


        </div>

      </Panels>
    </Panel>
  )
}

export default AccountPage;