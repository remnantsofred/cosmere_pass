import './LocationShowPage.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import Row from '../row/Row';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocation, fetchLocation } from '../../store/location';
import Loading from '../loading/Loading';
import Map from '../map';
import { StarIcon } from '../icon/Icon';
import StarRating from '../StarRating/StarRating';
import LessonDatesIndexItem from '../LessonDatesIndexItem'; 
import { getLessonDate, getLessonDates, fetchLessonDates, getLessonDatesForLocation } from '../../store/lessonDates';
import { getReservations, createReservation, fetchReservations, deleteReservation, removeReservation } from '../../store/reservation';

import ReservationConfirmModal from '../ReservationConfirmModal/ReservationConfirmModal';
import ReservationMadeModal from '../ReservationMadeModal/ReservationMadeModal';
import ReservationCancelModal from '../ReservationCancelModal/ReservationCancelModal';
import { getLessons, fetchLessons } from '../../store/lesson';
import { fetchReviews, getReviews, getReviewsForLocation } from '../../store/review';
import ReviewIndexItem from '../ReviewIndexItem/ReviewIndexItem';


export const LocationShowPage = () => {
  const { locationId } = useParams();
  const location = useSelector(getLocation(locationId));
  const reviews = useSelector(getReviewsForLocation(locationId));
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  // const [lessonDates, setLessonDates] = useState();
  const lessonDates = useSelector(getLessonDatesForLocation(locationId))
  const currentUser = useSelector(state => state.session.user);
  const [ modalStatus, setModalStatus ] = useState(false);
  const [ modalLocation, setModalLocation ] = useState();
  const [ modalLessonDate, setModalLessonDate ] = useState();
  const [ modalLesson, setModalLesson ] = useState();
  const [ modal3Status, setModal3Status ] = useState(false);
  const [ modal2Status, setModal2Status ] = useState(false);
  

  useEffect(()=>{
    Promise.all([
      dispatch(fetchLocation(locationId)),
      dispatch(fetchLessons()),
      dispatch(fetchLessonDates(locationId)),  
      dispatch(fetchReviews(locationId))  
    ]).then(() =>  setLoaded(true))
  },[locationId])



  useEffect(()=>{
    // setLoaded(false)
    // setLoaded(true)
  }, [modalStatus, modal2Status, modal3Status])
  
  const handleResClick = (lessonDate, lesson, location) => {
    setModalStatus(true)
    setModalLessonDate(lessonDate)
    setModalLesson(lesson)
    setModalLocation(location)
  }

  const handleModalClose = () => {
    setModalStatus(false)
    setModal3Status(false)
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
    setModalStatus(false)
    setModal2Status(true)
  }

  const handleResConfModalClose = () => {
    setModal2Status(false)
    setModalLessonDate("")
    setModalLesson("")
    setModalLocation("")
    setModal2Status("")
  }

  const handleCancel = (lessonDate, lesson, location) => {
    setModal3Status(true)
    setModalLessonDate(lessonDate)
    setModalLesson(lesson)
    setModalLocation(location)
  }

  const handleCancelModalConfirm = (lessonDate) => {
    dispatch(deleteReservation(lessonDate.currentUserReservationId))
    setModal3Status(false)
    // setLoaded(false)
    // setLoaded(true)
  }


  if(!loaded){
    return (
      <Loading />
    )
  } else {
    return(
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
              {lessonDates?.map((lessonDate, idx) => <LessonDatesIndexItem key={idx} lessonDate={lessonDate} location={location} handleResClick={handleResClick} handleCancel={handleCancel} source="locationShow"/>)}
            </ul>
          </Row>
          <Row className='LocShowPanelLRow LocReviews'>
            <h3 className="locShowSubtitle">Reviews</h3>
            <ul className='locShowIdxULLessonDates'>
              {reviews?.map((review, idx) => <ReviewIndexItem key={idx} review={review} className="ReviewIndexItem" />)}
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
    )
  }
}

export default LocationShowPage;