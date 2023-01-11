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
import { getLessons, fetchLessons } from '../../store/lesson';
import { getLessonDate, getLessonDates, fetchLessonDates, getLessonDatesForLocation } from '../../store/lessonDates';
import { fetchReviews, getReviews, getReviewsForLocation, createReview } from '../../store/review';



export const LocationShowPage = () => {
  const { locationId } = useParams();
  const location = useSelector(getLocation(locationId));
  const reviews = useSelector(getReviewsForLocation(locationId));
  const lessonDates = useSelector(getLessonDatesForLocation(locationId))
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const [ modalStatus, setModalStatus ] = useState(false);
  const [ modalLocation, setModalLocation ] = useState();
  const [ modalLessonDate, setModalLessonDate ] = useState();
  const [ modalLesson, setModalLesson ] = useState();
  // const [lessonDates, setLessonDates] = useState();
  // const [ modal3Status, setModal3Status ] = useState(false);
  // const [ modal2Status, setModal2Status ] = useState(false);
  

  useEffect(()=>{
    Promise.all([
      dispatch(fetchLocation(locationId)),
      dispatch(fetchLessons()),
      dispatch(fetchLessonDates(locationId)),  
      dispatch(fetchReviews(locationId))  
    ]).then(() =>  setLoaded(true))
  },[locationId])



  // useEffect(()=>{
  //   // setLoaded(false)
  //   // setLoaded(true)
  // }, [modalStatus, modal2Status, modal3Status])
  
  const handleResClick = (lessonDate, lesson, location) => {
    setModalStatus(1)
    setModalLessonDate(lessonDate)
    setModalLesson(lesson)
    setModalLocation(location)
  }

  const handleModalClose = () => {
    setModalStatus(false)
    // setModal3Status(false)
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
    // setLoaded(true)
    setModalStatus(2)
    // setModal2Status(true)
  }

  // const handleResConfModalClose = () => {
  //   setModal2Status(false)
  //   setModalLessonDate("")
  //   setModalLesson("")
  //   setModalLocation("")
  //   setModal2Status("")
  // }

  const handleCancel = (lessonDate, lesson, location) => {
    setModalStatus(3)
    setModalLessonDate(lessonDate)
    setModalLesson(lesson)
    setModalLocation(location)
  }

  const handleCancelModalConfirm = (lessonDate) => {
    dispatch(deleteReservation(lessonDate.currentUserReservationId, lessonDate.id))
    setModalStatus(false)
    // setLoaded(false)
    // setLoaded(true)
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
        { modalStatus === 4 && <ReviewFormModal currentUser={currentUser} location={location} handleModalClose={handleModalClose} handleReviewSubmit={handleReviewSubmit} source="location"/> }
      <Panels className="LocShowPage">

          <Panel className='LocShowPanelL'>
            <Row className='LocShowPanelLRow'>
              <img src={location.imageURL} alt={location.locationName} className='LocShowImg' />
            </Row>
            <Row className='locNameRow'>
              <h1 className='locName'>{location.locationName}</h1>
              <Row className='LocShowratingRow'>
                <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4> <StarRating rating={location.averageRating.toFixed(0)}/>
                <p className='locShowRevCt'>({location.reviewCount})</p>
              </Row>
            </Row>
            <Row className='LocShowPanelRRow'>
              This location offers {location.lessonTypes.join("and ")} lessons.
            </Row>
            <Row className='LocShowPanelLRow'>
              <p>{location.description}</p>
            </Row>
            
            <Row className='LocShowPanelLRow LocSchedule'>
              <h3 className="locShowSubtitle">Schedule</h3>
              <ul className='locShowIdxULLessonDates'>
                {lessonDates?.map((lessonDate, idx) => <LessonDatesIndexItem key={idx} lessonDate={lessonDate} location={location} handleResClick={handleResClick} handleCancel={handleCancel} source="locationShow" />)}
              </ul>
            </Row>
            <Row className='LocShowPanelLRow LocReviews'>
              {/* <h3 className="locShowSubtitle" id="locShowReviewSubtitle">{location.locationName} Reviews <NavLink className="lessonDateIdxItmReserve" id="LocShowPageReviewButton"  to={`/locations/${location.id}/review`} >Leave Review</NavLink></h3> */}
              <h3 className="locShowSubtitle" id="locShowReviewSubtitle">{location.locationName} Reviews <button onClick={() => setModalStatus(4)} className='lessonDateIdxItmReserve'>Leave Review</button></h3>
              
              <ul className='locShowIdxULLessonDates'>
                {reviews?.map((review, idx) => <ReviewIndexItem key={idx} review={review} />)}
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