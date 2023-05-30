import './AccountPage.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import Row from '../row/Row';
import ReservationIndex from '../ReservationIndex/ReservationIndex';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchReservations, getReservationsForUser} from '../../store/reservation';
import { fetchLocations, getLocations } from '../../store/location';


export const AccountPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [content, setContent] = useState('');
  const reservations = useSelector(getReservationsForUser(currentUser.id))
  
  useEffect(() => {
    dispatch(fetchReservations())
  }, [])

  // user has:   
  // attr_accessor :reservation_datetimes, :lessons_taken, :lessons_reviewed, :upcoming_reservations, :past_reservations, :locations_visited


  const renderContent = () => {
    if (content === 'upcoming-reservations'){
      return (
        <>
          <ReservationIndex user={currentUser} type='upcoming' reservations={reservations} ></ReservationIndex>
        </>
      )
    } else if (content === 'past-reservations'){
      return (
        <>
          <ReservationIndex user={currentUser} type='past' reservations={reservations}></ReservationIndex>
          {content}  
        </>
      )
    // } else if (content === 'favorites'){
    //   return (
    //     <>
    //       {content}  
    //     </>
    //   )
    } else if (content === 'reviews'){
      return (
        <>
          {content}  
        </>
      )
    } else {
      return (
        <>
          :D 
        </>
      )
    }

  }

  return(
    <Panel className='acct-page-container'>
      <Panels className='acct-page-panel-L'>
        <Row className='acct-page-title-row-welcome-banner'>Welcome back, <h6 className='username-header'>{currentUser.username}</h6></Row>
        <ul className='acct-page-title-ul'>
          <li className={ content === 'upcoming-reservations' ? 'acct-page-title-li acct-page-title-li-selected ' : 'acct-page-title-li'} onClick={() => setContent('upcoming-reservations')}>
            <p className='acct-page-selection'>{`Upcoming (${currentUser.upcomingReservations.length})`}</p>
          </li>
          <li className={ content === 'past-reservations' ? 'acct-page-title-li acct-page-title-li-selected ' : 'acct-page-title-li'} onClick={() => setContent('past-reservations')}>
            <p className='acct-page-selection'>{`Attended (${currentUser.pastReservations.length})`}</p>
          </li>
          {/* <li className='acct-page-title-li' onClick={() => setContent('favorites')}>
            <p className='acct-page-selection'>Favorites</p>
          </li> */}
          <li className={ content === 'reviews' ? 'acct-page-title-li acct-page-title-li-selected ' : 'acct-page-title-li'} onClick={() => setContent('reviews')}>
            {/* <p className='acct-page-selection'>{`Reviews (${currentUser.reviews?.length})`}</p> */}
            <p className='acct-page-selection'>Reviews</p>
          </li>
        </ul>
      </Panels>
      <Panels className='acct-page-panel-R'>
        <div className='acct-page-main-content-container'>
          {renderContent()}

        </div>

      </Panels>
    </Panel>
  )
}

export default AccountPage;