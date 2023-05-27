import './AccountPage.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import Row from '../row/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export const AccountPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [content, setContent] = useState('');
  
  const renderContent = () => {
    return (
      <>
        {content}  
      </>
    )
  }

  return(
    <Panel className='acct-page-container'>
      <Panels className='acct-page-panel-L'>
        <Row className='acct-page-title-row-welcome-banner'>Welcome back, <h6 className='username-header'>{currentUser.username}</h6></Row>
        <ul className='acct-page-title-ul'>
          <li className='acct-page-title-li' onClick={() => setContent('upcoming-reservations')}>
            <p className='acct-page-selection'>Upcoming reservations</p>
          </li>
          <li className='acct-page-title-li' onClick={() => setContent('past-reservations')}>
            <p className='acct-page-selection'>Past reservations</p>
          </li>
          <li className='acct-page-title-li' onClick={() => setContent('favorites')}>
            <p className='acct-page-selection'>Favorites</p>
          </li>
          <li className='acct-page-title-li' onClick={() => setContent('reviews')}>
            <p className='acct-page-selection'>Reviews</p>
          </li>
        </ul>
      </Panels>
      <Panels className='acct-page-panel-R'>
        <div className='acct-page-main-content-container'>
          {content}

        </div>

      </Panels>
    </Panel>
  )
}

export default AccountPage;