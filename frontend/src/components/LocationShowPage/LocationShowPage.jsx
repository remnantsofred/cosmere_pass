import './LocationShowPage.css';
import StarRating from '../StarRating/StarRating';
import Row from '../row/Row';
import ReviewIndexItem from '../ReviewIndexItem/ReviewIndexItem';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import ReservationMadeModal from '../ReservationMadeModal/ReservationMadeModal';
import ReservationConfirmModal from '../ReservationConfirmModal/ReservationConfirmModal';
import ReservationCancelModal from '../ReservationCancelModal/ReservationCancelModal';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Map from '../map';
import Loading from '../loading/Loading';
import LessonDatesIndexItem from '../LessonDatesIndexItem'; 
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { StarIcon } from '../icon/Icon';
import { getReservations, createReservation, fetchReservations, deleteReservation, removeReservation } from '../../store/reservation';
import { getLocation, fetchLocation } from '../../store/location';
import { getLessons, fetchLessons, getLessonsForLocation } from '../../store/lesson';
import { getLessonDate, getLessonDates, fetchLessonDates, getLessonDatesForLocation } from '../../store/lessonDates';
import { fetchReviews, getReviews, getReviewsForLocation, createReview, deleteReview, updateReview } from '../../store/review';



export const LocationShowPage = () => {
  const { locationId } = useParams();
  const location = useSelector(getLocation(locationId));
  const reviews = useSelector(getReviewsForLocation(locationId));
  const lessonDates = useSelector(getLessonDatesForLocation(locationId))
  const lessons = useSelector(getLessonsForLocation(locationId));
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const [ modalStatus, setModalStatus ] = useState(false);
  const [ modalLocation, setModalLocation ] = useState();
  const [ modalLessonDate, setModalLessonDate ] = useState();
  const [ modalLesson, setModalLesson ] = useState();
  const [ modalReview, setModalReview ] = useState();

  useEffect(()=>{
    Promise.all([
      dispatch(fetchLocation(locationId)),
      dispatch(fetchLessons()),
      dispatch(fetchLessonDates(locationId)),  
      dispatch(fetchReviews(locationId))  
    ]).then(() =>  setLoaded(true))
  },[locationId])

  useEffect(()=>{
    let sortedReviews = sortReviews(reviews)
    console.log(sortedReviews)
  }, [reviews])

  const sortReviews = (reviews)=>{
    let sortedReviews = reviews.sort((review1, review2) => {
      if (review1.updated_at < review2.updated_at) {
        return 1
      } else if (review1.updated_at > review2.updated_at) {
        return -1
      } else {
        return 0
      }
    })
    return sortedReviews;
  }



  const handleResClick = (lessonDate, lesson, location) => {
    setModalStatus(1)
    setModalLessonDate(lessonDate)
    setModalLesson(lesson)
    setModalLocation(location)
  }

  const handleModalClose = () => {
    setModalStatus(false)
    setModalLessonDate(null)
    setModalLesson(null)
    setModalLocation(null)
  }

  const handleResSubmit = (lessonDate) => {
    const data = {
      student_id: currentUser.id,
      lesson_date_id: lessonDate.id
    }
    dispatch(createReservation(data))
    setModalStatus(2)
  }

  const handleCancel = (lessonDate, lesson, location) => {
    setModalStatus(3)
    setModalLessonDate(lessonDate)
    setModalLesson(lesson)
    setModalLocation(location)
  }

  const handleCancelModalConfirm = (lessonDate) => {
    dispatch(deleteReservation(lessonDate.currentUserReservationId, lessonDate.id))
    setModalStatus(false)
  }

  // from modal: 
  // const reviewData = {
  //   lesson_id: lessonID,
  //   reviewer_id: currentUser.id,
  //   rating: rating,
  //   body: reviewBody,
  //   location_id: location.id
  // }
  const handleReviewSubmit = (reviewData) =>{
    dispatch(createReview(reviewData))
    setModalStatus(false)
  }

  const handleReviewEditSubmit = (reviewData) =>{
    dispatch(updateReview(reviewData))
    setModalStatus(false)
  }

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
  }

  const handleEditReviewClick = (review) => {
    setModalStatus(5)
    setModalLocation(location)
    setModalReview(review)
  }

  if(!loaded){
    return (
      <Loading />
    )
  } else {
    return(
      <>
        { modalStatus === 1 && <ReservationConfirmModal lessonDate={modalLessonDate} lesson={modalLesson} location={modalLocation} handleModalClose={handleModalClose} handleResSubmit={handleResSubmit} source="location"/> }
        { modalStatus === 2 && <ReservationMadeModal lessonDate={modalLessonDate} lesson={modalLesson} location={modalLocation} handleModalClose={handleModalClose} source="location"/> }
        { modalStatus === 3 && <ReservationCancelModal lessonDate={modalLessonDate} lesson={modalLesson} location={modalLocation} handleModalClose={handleModalClose} handleCancelModalConfirm={handleCancelModalConfirm} source="location"/> }
        { modalStatus === 4 && <ReviewFormModal currentUser={currentUser} location={location} handleModalClose={handleModalClose} handleReviewSubmit={handleReviewSubmit} source="location" lessons={lessons} /> }
        { modalStatus === 5 && <ReviewFormModal currentUser={currentUser} location={location} review={modalReview} handleModalClose={handleModalClose} handleReviewEditSubmit={handleReviewEditSubmit} source="location" lessons={lessons} className="ReviewEditModal"/> }
      <Panels className="LocShowPage">

          <Panel className='LocShowPanelL'>
            <Row className='LocShowPanelLRow'>
              <img src={location.imageURL} alt={location.locationName} className='LocShowImg' />
            </Row>
            <Row className='locNameRow'>
              <h1 className='locName'>{location.locationName}</h1>
              <Row className='LocShowratingRow'>
                <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4> <StarRating assignedRating={location.averageRating.toFixed(0)}/>
                <div className='locShowRevCt'>({location.reviewCount})</div>
              </Row>
            </Row>
            <Row className='LocShowPanelRRow'>
              This location offers {location.lessonTypes.join("and ")} lessons.
            </Row>
            <Row className='LocShowPanelLRow'>
              <div>{location.description}</div>
            </Row>
            
            <Row className='LocShowPanelLRow LocSchedule'>
              <h3 className="locShowSubtitle">Schedule</h3>
              <ul className='locShowIdxULLessonDates'>
                {lessonDates?.map((lessonDate, idx) => 
                  <LessonDatesIndexItem 
                    key={idx} 
                    lessonDate={lessonDate} 
                    location={location} 
                    handleResClick={handleResClick} 
                    handleCancel={handleCancel} 
                    source="locationShow" />)}
              </ul>
            </Row>
            <Row className='LocShowPanelLRow LocReviews'>
              <h3 className="locShowSubtitle" id="locShowReviewSubtitle">{location.locationName} Reviews 
              { currentUser && 
                <button 
                  onClick={() => setModalStatus(4)} 
                  className='lessonDateIdxItmReserve'>Leave Review
                </button>}
              </h3>
              
              <ul className='locShowIdxULLessonDates'>
                {reviews?.map((review, idx) => 
                  <ReviewIndexItem 
                    key={idx} 
                    review={review} 
                    currentUser={currentUser} 
                    setModalStatus={setModalStatus} 
                    handleDeleteReview={handleDeleteReview} 
                    handleEditReviewClick={handleEditReviewClick}/>)}
              </ul>
            </Row>
          </Panel>
          <Panel className='LocShowPanelR'>
            <ul className='LocShowMap'>
              <Map />
            </ul>
            <Row className='LocShowPanelRRow'>
            </Row>
            <Row className='LocShowPanelRRow'>
            </Row>
            <Row className='LocShowPanelRRow'>
            </Row>
            <Row className='LocShowPanelRRow'>
            </Row>
          </Panel>



      </Panels>
      </>
    )
  }
}

export default LocationShowPage;