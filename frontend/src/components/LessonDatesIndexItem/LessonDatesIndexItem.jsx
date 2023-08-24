import './LessonDatesIndexItem.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Row from '../row/Row';
import Column from '../column/Column';
import { NavLink } from 'react-router-dom';
import { formatTime, timeBetween, formatDateWithDayShort } from '../../utils/date_util';
import { StarIcon } from '../icon/Icon';
import { getLesson } from '../../store/lesson';
import ToolTip from '../ToolTip/ToolTip';

// reservations passed from SearchPage component are just reservations for this specific lessonDate
export const LessonDatesIndexItem = ({lessonDate, location, handleResClick, handleCancel, source}) => {

  const lesson = useSelector(getLesson(lessonDate.lessonId));
  const currentUser = useSelector(state => state.session.user);
  const [toolTipIsShown, setToolTipIsShown] = useState(false);
  
  const renderLoggedIn = (lessonDate, location, handleResClick, handleCancel, source, currentUser) => {
    if (lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation && !lessonDate.currentUserWouldBeDoublebooked) {
      // if logged in and reservation available and user has not reserved it and it wouldn't be double booked
      return (
        <>
          <button onClick={ () => handleResClick(lessonDate, lesson, location)} className={'lessonDateIdxItmReserve'}>Reserve</button> 
          <p className='remainingSlots'>Available slots: {lessonDate.remainingSlots}</p>
        </>
      )
    } else if (lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation && lessonDate.currentUserWouldBeDoublebooked) {
      // if logged in and reservation available and user has not reserved it BUT WOULD BE double booked
      return (
        <>
          <button 
            onClick={ () => handleResClick(lessonDate, lesson, location)} 
            className={'lessonDateIdxItmReserve double-booked'}
            onMouseEnter={()=>setToolTipIsShown(true)}
            onMouseLeave={()=>setToolTipIsShown(false)}
            >
              Reserve
          </button> 
          
          <p className='remainingSlots'>Available slots: {lessonDate.remainingSlots}</p>
        </>
      )
    } else if (currentUser && lessonDate.userHasReservation) {
      // if logged in and already reserved (show cancel)
      return (
        <>
          <button onClick={ () => handleCancel(lessonDate, lesson, location)} className="lessonDateIdxItmCancel">Cancel</button>
          <p className={source === "search" ? "reserved" : "reservedLocShow"}>reserved</p>
        </>
      )
    } else if (!lessonDate.remainingSlots  && !lessonDate.userHasReservation) {
      // if logged in and reservation full
      return (
        <>
          <button  className='lessonDateIdxItmReserveFull'>Lesson full</button> 
          <p className='remainingSlots'>No available slots</p>
        </>
      )
    }
  }
  
  const renderLoggedOut = () => {
    return (
      <>
        <NavLink to='/signup' className='lessonDateIdxItmReserve loggedOutSignUp'>Sign up</NavLink> 
      </>
    )
  }
  
  return (
    <Row className={source === "search" ? "lessonDateIdxItmRow" : "locShowLessonDateIdxItmRow"}>
      <Column className={source === "search" ? 'lessonDateIdxItmTimeCol' : 'locShowLessonDateIdxItmTimeCol'}>
        <p className={source === "search" ? "lessonDateIdxItmTime startTime" : "lessonDateIdxItmTime startTimeLoc"}>{formatTime(lessonDate.startTime)}</p>
        {/* <p className={source === "search" ? "lessonDateIdxItmTime startTime" : "lessonDateIdxItmTime startTimeLoc"}>{'testing'}</p> */}
        <p className="lessonDateIdxItmTime duration">{timeBetween(lessonDate.startTime, lessonDate.endTime)} min</p>
        {/* <p className="lessonDateIdxItmTime duration">{formatDateWithDayShort(lessonDate.startTime)}</p> */}
      </Column>
      <Column className={source === "search" ? "lessonDateIdxItmCol2": "locShowIdxItmCol2"}>
        <NavLink to={`/locations/${location.id}`} className="lessonDateIdxItmLink">{lesson.title}</NavLink>
        {source === "search" && <Row className='LocIdxItmratingsRow'>
          <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4>
          <StarIcon className='starIcon'/>
          <p className='locRevCt'>({location.reviewCount})</p>
        </Row>}
      </Column>
      {/* note: need to fix tooltip or lessondateindexitem styling so it fits on the location show page */}
      {source === "search" && <Column className='lessonDateIdxItmCol3'>
        <NavLink to={`/locations/${location.id}`} className="lessonDateIdxItmLocLink">{location.locationName}</NavLink>
        <h3 className="lessonDateIdxItmLessonType">{lesson.lessonType}</h3>
        {toolTipIsShown && 
          <ToolTip 
            className='double-booked' 
            text='Are you sure? You already have a lesson reserved at this time. You will be charged a no-show fee for missing any lesson. 
            Make sure to cancel your other lesson if you are sure!' /> }
        
      </Column> }
      
      <Column className={source === "search" ? 'lessonDateIdxItmRCol' : 'locShowIdxItmRCol'}>
        {currentUser ? renderLoggedIn(lessonDate, location, handleResClick, handleCancel, source, currentUser) : renderLoggedOut()}
      </Column>

      
    </Row>
  )


}

export default LessonDatesIndexItem;