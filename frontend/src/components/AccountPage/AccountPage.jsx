import './AccountPage.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import Row from '../row/Row';
import ReservationIndex from '../ReservationIndex/ReservationIndex';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchReservations, getReservationsForUser} from '../../store/reservation';
import { fetchLocations, getLocations } from '../../store/location';
import ReservationCancelModal from '../ReservationCancelModal/ReservationCancelModal';
import { deleteReservation } from '../../store/reservation';
import { fetchLessonDates, getLessonDates } from '../../store/lessonDates';
import { fetchLessons, getLessons } from '../../store/lesson';

export const AccountPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [content, setContent] = useState('');
  const reservations = useSelector(getReservationsForUser(currentUser.id))
  const lessonDates = useSelector(getLessonDates)
  const locations = useSelector(getLocations)
  const lessons = useSelector(getLessons)
  const [ modalStatus, setModalStatus ] = useState(false);
  const [ modalLessonDate, setModalLessonDate ] = useState();
  const [ modalLesson, setModalLesson ] = useState();
  const [ modalLocation, setModalLocation ] = useState();

  
  useEffect(() => {
    dispatch(fetchReservations())
    dispatch(fetchLocations())
    dispatch(fetchLessonDates())
    dispatch(fetchLessons())
  }, [])
  

  const getLocation = (locationId, locations) => {
    for (const location of locations) {
      if (location.id === locationId) {
        return location;
      }
    }
  }
  
  const getLesson = (lessonId, lessons) => {
    for (const lesson of lessons) {
      if (lesson.id === lessonId) {
        return lesson;
      }
    }
  }

  const getLessonDate = (lessonDateId, lessonDates) => {
    for (const lessonDate of lessonDates) {
      if (lessonDate.id === lessonDateId) {
        return lessonDate;
      }
    }
  }

  const handleCancel = (reservation) => {
    setModalLessonDate(getLessonDate(reservation.lessonDateId, lessonDates))
    setModalLesson(getLesson(reservation.lessonId, lessons))
    setModalLocation(getLocation(reservation.locationId, locations))
    setModalStatus(true)
  }

  const handleCancelModalConfirm = (lessonDate) => {
    dispatch(deleteReservation(lessonDate.currentUserReservationId, lessonDate.id))
    setModalStatus(false)
  }

  const handleModalClose = () => {
    setModalStatus(false)
    setModalLessonDate(null)
    setModalLesson(null)
    setModalLocation(null)
  }

  

  const renderContent = () => {
    if (content === 'upcoming-reservations'){
      return (
        <>
          <ReservationIndex  
            user={currentUser} 
            type='upcoming' 
            reservations={reservations} 
            handleCancel={handleCancel} 
            
            ></ReservationIndex>
        </>
      )
    } else if (content === 'past-reservations'){
      return (
        <>
          <ReservationIndex 
            user={currentUser} 
            type='past' 
            reservations={reservations}
            >

            </ReservationIndex> 
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
          {/* Use the menu on the left to make your selection  */}
        </>
      )
    }

  }

  return(
    <Panel className='acct-page-page'>
      { modalStatus === true && <ReservationCancelModal lessonDate={modalLessonDate} lesson={modalLesson} location={modalLocation} handleModalClose={handleModalClose} handleCancelModalConfirm={handleCancelModalConfirm} /> }
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