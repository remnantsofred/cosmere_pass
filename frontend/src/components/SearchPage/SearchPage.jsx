import './SearchPage.css';
import { formatDateInput } from '../../utils/date_util';
import { getLessonDates, fetchLessonDates } from '../../store/lessonDates';
import { getLessons, fetchLessons } from '../../store/lesson';
import { getLocations, fetchLocations } from '../../store/location';
import { createReservation, deleteReservation } from '../../store/reservation';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { sortByEarliestToLatestStartTime } from '../../utils/sorting_util'
import { getParams } from '../../utils/general_util';

export const SearchPage = withRouter(({children, id='', className="SearchPage", history}) => {
  const lessonDates = useSelector(getLessonDates);
  const locations = useSelector(getLocations);
  const lessons = useSelector(getLessons);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [indexType, setIndexType] = useState('lessons');
  const [ modalStatus, setModalStatus ] = useState(false);
  const [ modalLessonDate, setModalLessonDate ] = useState();
  const [ modalLesson, setModalLesson ] = useState();
  const [ modalLocation, setModalLocation ] = useState();
  const [ numChangedReservation, setNumChangedReservation ] = useState(0);
  const currentUser = useSelector(state => state.session.user);

  
  useEffect(() => {
    const paramsMap = getParams(history.location.search)
    Promise.all([
      dispatch(fetchLocations()),
      dispatch(fetchLessons()),
      dispatch(fetchLessonDates(paramsMap.location_id, paramsMap.lesson_type, paramsMap.start_time)),
    ]).then(()=> {
      setLoaded(true)
    })
  }, [])
  
  useEffect(() => {
    if (loaded) {
      const paramsMap = getParams(history.location.search)
      dispatch(fetchLessonDates(paramsMap.location_id, paramsMap.lesson_type, paramsMap.start_time))
        .then(()=>setLoaded(true))
    }
  },[history.location.search])


  useEffect(()=>{
    if (loaded) {
      const paramsMap = getParams(history.location.search)
      dispatch(fetchLessonDates(paramsMap.location_id, paramsMap.lesson_type, paramsMap.start_time))
    }
  }, [numChangedReservation])

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
    const prev = numChangedReservation
    dispatch(createReservation(data))
      .then(()=> setNumChangedReservation(prev+1))
    setModalStatus(2)
  }


  const handleCancel = (lessonDate, lesson, location) => {
    setModalStatus(3)
    setModalLessonDate(lessonDate)
    setModalLesson(lesson)
    setModalLocation(location)
  }

  const handleCancelModalConfirm = (lessonDate) => {
    const prev = numChangedReservation
    dispatch(deleteReservation(lessonDate.currentUserReservationId, lessonDate.id))
      .then(()=> setNumChangedReservation(prev-1))
    setModalStatus(false)
  }

  const resultsToDisplay = (lessonDates) => {
    if (lessonDates.length){
      return (
        <>
        {sortByEarliestToLatestStartTime(lessonDates)?.map((lessonDate, idx) => 
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
            onClick={()=>{history.push('/search?start_time=0')}} 
            className="clearFilterButton">
              Clear filters
          </button>
        </div>
      )
    }
  }

  const getfilteredLessonDates = (lessonDates) => {
    const paramsMap = getParams(history.location.search)
    let filteredResults = lessonDates

    if (paramsMap.location_id){
      filteredResults = filteredResults.filter(lessonDate => lessonDate.locationId === parseInt(paramsMap.location_id))
    }
    if (paramsMap.lesson_type){
      filteredResults = filteredResults.filter(lessonDate => lessonDate.lessonType.includes(paramsMap.lesson_type)) 
    }
    if (paramsMap.start_time){
      const numDays = parseInt(paramsMap.start_time)
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + numDays)
  
      const formattedNewDate = formatDateInput(nextDay)

      filteredResults = filteredResults.filter(lessonDate => lessonDate.startTime.includes(formattedNewDate))

    // } else if (!paramsMap.start_time){
    //   const today = new Date();

    //   filteredResults = filteredResults.filter(lessonDate => lessonDate.startTime.includes(formatDateInput(today)))
    }

    return filteredResults;
  }

  

  

  if (!loaded) {
    return (        
      <Loading />
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
          passedSearchParams={getParams(history.location.search)}
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
                resultsToDisplay(getfilteredLessonDates(lessonDates))
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