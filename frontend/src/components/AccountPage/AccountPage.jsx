import './AccountPage.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import Row from '../row/Row';
import ReservationIndex from '../ReservationIndex/ReservationIndex';
import ReservationMadeModal from '../ReservationMadeModal/ReservationMadeModal';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchReservations, getReservationsForUser} from '../../store/reservation';
import { fetchLocations, getLocations } from '../../store/location';
import ReservationCancelModal from '../ReservationCancelModal/ReservationCancelModal';
import { deleteReservation } from '../../store/reservation';
import { fetchLessonDates, getLessonDates } from '../../store/lessonDates';
import { fetchLessons, getLessons } from '../../store/lesson';
import Loading from '../loading/Loading';
import { fetchReviews, getReviews, deleteReview, getReviewsForUser } from '../../store/review';
import ReviewIndexItem from '../ReviewIndexItem/ReviewIndexItem';


export const AccountPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [content, setContent] = useState('');
  const reservations = useSelector(getReservationsForUser(currentUser.id))
  const lessonDates = useSelector(getLessonDates)
  const locations = useSelector(getLocations)
  const lessons = useSelector(getLessons)
  const reviews = useSelector(getReviewsForUser(currentUser.id))
  const [ modalStatus, setModalStatus ] = useState(false);
  const [ modalLessonDate, setModalLessonDate ] = useState();
  const [ modalLesson, setModalLesson ] = useState();
  const [ modalLocation, setModalLocation ] = useState();
  const [loaded, setLoaded] = useState(false);
  const [ modalReview, setModalReview ] = useState();
  
  useEffect(() => {
    Promise.all([
      dispatch(fetchReservations()),
      dispatch(fetchLocations()),
      dispatch(fetchLessonDates()),
      dispatch(fetchLessons()),
      dispatch(fetchReviews(''))
    ]).then(() => setLoaded(true))
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

  const handleCancel = (reservation, mode) => {
    setModalLessonDate(getLessonDate(reservation.lessonDateId, lessonDates))
    setModalLesson(getLesson(reservation.lessonId, lessons))
    setModalLocation(getLocation(reservation.locationId, locations))
    if (mode === 'cancel'){
      setModalStatus(1)
    } else {
      setModalStatus(2)
    }   
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

  const selectReservations = (reservations, type) => {

    let filtered = []

    if (type === 'upcoming'){
      filtered = reservations.filter(reservation => reservation.status === 'upcoming')
    } else {
      filtered = reservations.filter(reservation => reservation.status === 'past')
    }

    const sortedReservations = filtered.sort((reservation1, reservation2) => {
      if (reservation1.startTime > reservation2.startTime) {
        return 1
      } else if (reservation1.startTime < reservation2.startTime) {
        return -1
      } else {
        return 0
      }
    })
    

    return sortedReservations;
    
  }

  // const userReviews = (reviews) => {
  //   return reviews.filter(review => review.currentUserReviewed == true)
  // }


  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
  }

  const handleEditReviewClick = (review) => {
    setModalStatus(5)
    setModalLocation(review.location)
    setModalReview(review)
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
    } 
    else if (content === 'reviews'){
      return (
        // <>
          <ul className='locShowIdxULLessonDates'>
                {reviews?.reverse().map((review, idx) => 
                  <ReviewIndexItem 
                    key={idx} 
                    review={review} 
                    currentUser={currentUser} 
                    setModalStatus={setModalStatus} 
                    handleDeleteReview={handleDeleteReview} 
                    handleEditReviewClick={handleEditReviewClick}/>)}
          </ul> 
        // </>
      )
    } else {
      return (
        <>
          {/* Use the menu on the left to make your selection  */}
        </>
      )
    }

  }

  if (!loaded) {
    return (
      <Loading/>
    )
  } else if (loaded) {
    return(
      <>  
      
        <Row className='test'></Row>
        <Panel className='acct-page-page'>
          { modalStatus === 1 && 
            <ReservationCancelModal
              lessonDate={modalLessonDate} 
              lesson={modalLesson} 
              location={modalLocation}
              handleModalClose={handleModalClose} 
              handleCancelModalConfirm={handleCancelModalConfirm} /> }
          { modalStatus === 2 && 
            <ReservationMadeModal 
              lessonDate={modalLessonDate} 
              lesson={modalLesson} 
              location={modalLocation} 
              handleModalClose={handleModalClose} 
              handleCancelModalConfirm={handleCancelModalConfirm} 
              source="account-page" 
              /> }
          {/* { modalStatus === 3 && <ReviewFormModal currentUser={currentUser} location={location} handleModalClose={handleModalClose} handleReviewSubmit={handleReviewSubmit} source="location" lessons={lessons} /> }
          { modalStatus === 4 && <ReviewFormModal currentUser={currentUser} location={location} review={modalReview} handleModalClose={handleModalClose} handleReviewEditSubmit={handleReviewEditSubmit} source="location" lessons={lessons} className="ReviewEditModal"/> } */}
          <Panels className='acct-page-panel-L'>
            <Row className='acct-page-title-row-welcome-banner'>Welcome back, <h6 className='username-header'>{currentUser.username}</h6></Row>
            <ul className='acct-page-title-ul'>
              <li className={ content === 'upcoming-reservations' ? 'acct-page-title-li acct-page-title-li-selected ' : 'acct-page-title-li'} onClick={() => setContent('upcoming-reservations')}>
                <p className='acct-page-selection'>{`Upcoming (${selectReservations(reservations, 'upcoming').length})`}</p>
              </li>
              <li className={ content === 'past-reservations' ? 'acct-page-title-li acct-page-title-li-selected ' : 'acct-page-title-li'} onClick={() => setContent('past-reservations')}>
                <p className='acct-page-selection'>{`Attended (${selectReservations(reservations, 'past').length})`}</p>
              </li>
              {/* <li className='acct-page-title-li' onClick={() => setContent('favorites')}>
                <p className='acct-page-selection'>Favorites</p>
              </li> */}
              <li className={ content === 'reviews' ? 'acct-page-title-li acct-page-title-li-selected ' : 'acct-page-title-li'} onClick={() => setContent('reviews')}>
                <p className='acct-page-selection'>{`Reviews (${reviews?.length})`}</p>
                {/* <p className='acct-page-selection'>Reviews</p> */}
              </li>
            </ul>
          </Panels>
          <Panels className='acct-page-panel-R'>
            <div className='acct-page-main-content-container'>
              {renderContent()}

            </div>

          </Panels>
        </Panel>
      </>
    )

  }
}

export default AccountPage;