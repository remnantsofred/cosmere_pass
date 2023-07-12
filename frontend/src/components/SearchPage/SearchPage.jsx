import './SearchPage.css';
import { FaLessThanEqual } from 'react-icons/fa';
import { formatDateWithDayShort } from '../../utils/date_util';
import { getCurrentUser } from '../../store/session';
import { getLessonDates, fetchLessonDates } from '../../store/lessonDates';
import { getLessons, fetchLessons } from '../../store/lesson';
import { getLocations, fetchLocations } from '../../store/location';
import { getReservations, createReservation, fetchReservations, deleteReservation, removeReservation } from '../../store/reservation';
import { Redirect, NavLink, useParams, withRouter } from 'react-router-dom';
import { SiTruenas } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import Column from '../column/Column';
import Columns from '../columns/Columns';
import LessonDatesIndexItem from '../LessonDatesIndexItem';
import LessonIndexItem from '../LessonIndexItem/LessonIndexItem';
import Loading from '../loading/Loading';
import LocationIndexItem from '../LocationIndexItem/LocationIndexItem';
import Map from '../map';
import Panel from '../panel/Panel';
import Panels from '../panels';
import React, { useState, useEffect } from 'react';
import ReservationCancelModal from '../ReservationCancelModal/ReservationCancelModal';
import ReservationConfirmModal from '../ReservationConfirmModal/ReservationConfirmModal';
import ReservationMadeModal from '../ReservationMadeModal/ReservationMadeModal';
import Row from '../row/Row';
import SearchNav from '../SearchNav';
import { getItemByID } from '../../utils/general_util';



export const SearchPage = withRouter(({children, id='', className="SearchPage", history}) => {
  const lessonDates = useSelector(getLessonDates);
  const locations = useSelector(getLocations);
  // const reservations = useSelector(getReservations);
  const lessons = useSelector(getLessons);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [indexType, setIndexType] = useState('lessons');
  const [ modalStatus, setModalStatus ] = useState(false);
  // const [ modal2Status, setModal2Status ] = useState(false);
  // const [ modal3Status, setModal3Status ] = useState(false);
  const [ modalLessonDate, setModalLessonDate ] = useState();
  const [ modalLesson, setModalLesson ] = useState();
  const [ modalLocation, setModalLocation ] = useState();
  const currentUser = useSelector(state => state.session.user);

  
  useEffect(() => {
    const paramsMap = getParams(history.location.search)
    Promise.all([
      dispatch(fetchLocations()),
      dispatch(fetchLessons()),
      dispatch(fetchLessonDates(paramsMap.location_id, paramsMap.lesson_type)),
    ]).then(()=> {
      setLoaded(true)
    })
  }, [])
  
  useEffect(() => {
    if (loaded) {
      setLoaded(false)
      const paramsMap = getParams(history.location.search)
      dispatch(fetchLessonDates(paramsMap.location_id, paramsMap.lesson_type)).then(()=>setLoaded(true))
    }
  },[history.location.search])


  const getParams = (params) => {
    const paramsString = params.slice(1)
    const paramsArray = paramsString.split('&')
    const paramsMap = {};
    for (const param of paramsArray){
      const [key, value] = param.split('=')
      paramsMap[key] = value
    }
    return paramsMap;
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

  const resultsToDisplay = (filteredLessonDates) => {
    if (filteredLessonDates.length){
      return (
        <>
        {filteredLessonDates?.map((lessonDate, idx) => 
                <LessonDatesIndexItem 
                  handleResClick={handleResClick} 
                  lessonDate={lessonDate} 
                  lesson={getItemByID(lessonDate.lessonId, lessons)} 
                  location={getItemByID(getItemByID(lessonDate.lessonId, lessons).locationId, locations)} 
                  currrentUser={currentUser} 
                  key={idx} 
                  handleCancel={handleCancel} 
                  source="search" 
                  modalStatus={modalStatus} 
                   />) }
        </>
      )
    } else {
      return (
        <div className="no-results">
          <div className="noResHeader">No results found</div>
          <div className="noResText">Adjust your location or edit your filters.</div>
          <button 
            onClick={()=>{history.push('/search')}} 
            className="clearFilterButton">
              Clear filters
          </button>
        </div>
      )
    }
  }

  const filteredLessonDates = lessonDates.filter((lessonDate)=>{
    const paramsMap = getParams(history.location.search)
    if (paramsMap.location_id && paramsMap.lesson_type){
      return lessonDate.locationId === parseInt(paramsMap.location_id) && lessonDate.lessonType.includes(paramsMap.lesson_type) 
    }
    if (paramsMap.lesson_type){
      return lessonDate.lessonType.includes(paramsMap.lesson_type)
    }
    if (paramsMap.location_id){
      return lessonDate.locationId === parseInt(paramsMap.location_id)
    }
    if (paramsMap.start_time){
      return paramsMap.start_time.includes(lessonDate.startTime)
    }
    return true;
  })

  

  if (!loaded) {
    return (
      <>
       {/* <SearchNav 
          locations={[]} 
          lessons={[]} 
          lessonDates={[]}
          currentUser={undefined}
          indexType={"search"}
           /> */}
                 <Loading />
      </>

    )
  } else {
    return (
      <>
        <SearchNav 
          locations={locations} 
          lessons={lessons} 
          lessonDates={lessonDates}
          currentUser={currentUser}
          indexType={indexType}
           />
        <Panels id={id} className={className}>
          { children }
          { modalStatus === 1 && <ReservationConfirmModal lessonDate={modalLessonDate} lesson={modalLesson} location={modalLocation} handleModalClose={handleModalClose} handleResSubmit={handleResSubmit} source="search"/> }
          { modalStatus === 2 && <ReservationMadeModal lessonDate={modalLessonDate} lesson={modalLesson} location={modalLocation} handleModalClose={handleModalClose} source="search" /> }
          { modalStatus === 3 && <ReservationCancelModal lessonDate={modalLessonDate} lesson={modalLesson} location={modalLocation} handleModalClose={handleModalClose} handleCancelModalConfirm={handleCancelModalConfirm} source="search"/> }
          <Panel className='lessonDatesIdxleftPanel'>
          
              <Row className="IndexToggleBar">
                <div onClick={() => setIndexType('lessons')} className={indexType === 'lessons' ? "searchTypeSelected" : "searchTypeunSelected"} >
                  Lessons
                </div>
                <div onClick={() => setIndexType('locations')} className={indexType === 'locations' ? "searchTypeSelected" : "searchTypeunSelected"} >
                  Locations
                </div>
              </Row>
    
            <ul className='lessonDatesIdxUL'>
              {indexType === 'locations' 
                ? 
              locations?.map((location, idx) => 
                <LocationIndexItem 
                  myLocation={location} 
                  lessonIds={location.lessonIds} 
                  key={idx} />) 
                : 
              currentUser 
                ? 
                resultsToDisplay(filteredLessonDates)
                : 
              lessons?.map((lesson, idx) => 
                <LessonIndexItem 
                  lesson={lesson} 
                  key={idx} 
                  location={getItemByID(lesson.locationId, locations)}/>) 
              }
            </ul>
          </Panel>
          <Panel className='lessonDatesIdxrightPanel'>
            <Map source='search'> 
              
            </Map> 
          </Panel>
        </Panels> 
      </>
    )
  }
})

export default SearchPage;