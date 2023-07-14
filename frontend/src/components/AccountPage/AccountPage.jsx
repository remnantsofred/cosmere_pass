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
import { fetchReviews, getReviews, deleteReview, getReviewsForUser, createReview, updateReview } from '../../store/review';
import ReviewIndexItem from '../ReviewIndexItem/ReviewIndexItem';
import { withRouter } from 'react-router-dom';
import { sortByMostRecentlyUpdated } from '../../utils/sorting_util' 
import { getItemByID } from '../../utils/general_util'


export const AccountPage = withRouter(({history}) => {
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
      dispatch(fetchReservations(currentUser.id)),
      dispatch(fetchLocations()),
      dispatch(fetchLessonDates("", "", "", currentUser.id)),
      dispatch(fetchLessons()),
      dispatch(fetchReviews('', currentUser.id))
    ]).then(() => setLoaded(true))
  }, [])
  

  const handleCancel = (reservation, mode) => {
    setModalLessonDate(getItemByID(reservation.lessonDateId, lessonDates))
    setModalLesson(getItemByID(reservation.lessonId, lessons))
    setModalLocation(getItemByID(reservation.locationId, locations))
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
    
    return filtered
  }

  const handleReviewSubmit = (reviewData) =>{
    if (reviewData.body){
      dispatch(createReview(reviewData))
      setModalStatus(false)
    } else {
      alert('Please enter a review')
    }
  }

  const handleReviewEditSubmit = (reviewData) =>{
    dispatch(updateReview(reviewData))
    setModalStatus(false)
  }


  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
  }

  const handleEditReviewClick = (review) => {
    setModalLocation(getItemByID(review.locationId, locations))
    setModalStatus(4)
    setModalReview(review)
  }

  const renderContent = () => {
    if (content === 'upcoming-reservations'){
      return (
        <>
          <ReservationIndex  
            user={currentUser} 
            type='upcoming' 
            reservations={selectReservations(reservations, 'upcoming')} 
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
            reservations={selectReservations(reservations, 'past')}
            
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
        <>
          <div 
            className='reservation-index-header'>
            You have reviewed {reviews?.length} {reviews.length === 1 ? 'lesson' : 'lessons'}
          </div>
          <ul className='acct-page-review-ul'>
                {sortByMostRecentlyUpdated(reviews)?.map((review, idx) => 
                  <ReviewIndexItem 
                    key={idx} 
                    review={review} 
                    currentUser={currentUser} 
                    setModalStatus={setModalStatus} 
                    handleDeleteReview={handleDeleteReview} 
                    handleEditReviewClick={handleEditReviewClick}/>)}
          </ul> 
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
          {/* { modalStatus === 3 && 
            <ReviewFormModal 
              currentUser={currentUser} 
              location={location} 
              handleModalClose={handleModalClose} 
              handleReviewSubmit={handleReviewSubmit} 
              source="location" 
              lessons={lessons} /> } */}
          { modalStatus === 4 && 
            <ReviewFormModal 
              currentUser={currentUser} 
              location={modalLocation} 
              review={modalReview} 
              handleModalClose={handleModalClose} 
              handleReviewEditSubmit={handleReviewEditSubmit} 
              source="location" 
              lessons={lessons} 
              className="ReviewEditModal"/> } 
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
})

export default AccountPage;