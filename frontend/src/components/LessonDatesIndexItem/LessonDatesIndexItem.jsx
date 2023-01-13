import './LessonDatesIndexItem.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from '../row/Row';
import Column from '../column/Column';
import { Link, NavLink, useParams } from 'react-router-dom';
import { getLocation, fetchLocation } from '../../store/location';
import { formatDate, formatTime, timeBetween } from '../../utils/date_util';
import { StarIcon } from '../icon/Icon';
import { getReservations, getReservation, fetchReservations, fetchReservation } from '../../store/reservation';
import { getLesson, fetchLesson } from '../../store/lesson';

// reservations passed from SearchPage component are just reservations for this specific lessonDate
export const LessonDatesIndexItem = ({lessonDate, location, handleResClick, handleCancel, source}) => {
  const dispatch = useDispatch();
  const lesson = useSelector(getLesson(lessonDate.lessonId));
  const currentUser = useSelector(state => state.session.user);
  
  const renderLoggedIn = (lessonDate, location, handleResClick, handleCancel, source, currentUser) => {
    if (lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation) {
      // if logged in and resume
      return (
        <>
          <button onClick={ () => handleResClick(lessonDate, lesson, location)} className={lessonDate.remainingSlots > 0 ? 'lessonDateIdxItmReserve' : 'lessonDateIdxItmReserveFull'}>Reserve</button> 
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
          <button onClick={ () => handleResClick(lessonDate, lesson, location)} className='lessonDateIdxItmReserveFull'>Reserve</button> 
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
        <p className="lessonDateIdxItmTime duration">{timeBetween(lessonDate.startTime, lessonDate.endTime)} min</p>
      </Column>
      <Column className={source === "search" ? "lessonDateIdxItmCol2": "locShowIdxItmCol2"}>
        <NavLink to={`/locations/${location.id}`} className="lessonDateIdxItmLink">{lesson.title}</NavLink>
        {source === "search" && <Row className='LocIdxItmratingsRow'>
          <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4>
          <StarIcon className='starIcon'/>
          <p className='locRevCt'>({location.reviewCount})</p>
        </Row>}
      </Column>
      {source === "search" && <Column className='lessonDateIdxItmCol3'>
        <NavLink to={`/locations/${location.id}`} className="lessonDateIdxItmLocLink">{location.locationName}</NavLink>
        <h3 className="lessonDateIdxItmLessonType">{lesson.lessonType}</h3>
        
      </Column> }
      {/* <Column className='lessonDateIdxItmImgCol'>
        <img src={lesson.photoURL} alt="" className='lessonIdxImg'/>
      </Column> */}
      <Column className={source === "search" ? 'lessonDateIdxItmRCol' : 'locShowIdxItmRCol'}>
        {currentUser ? renderLoggedIn(lessonDate, location, handleResClick, handleCancel, source, currentUser) : renderLoggedOut()}
      </Column>

      {/* old column - works */}
      {/* <Column className={source === "search" ? 'lessonDateIdxItmRCol' : 'locShowIdxItmRCol'}>
        { lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation
        ? 
        <button onClick={ () => handleResClick(lessonDate, lesson, location)} className={lessonDate.remainingSlots > 0 ? 'lessonDateIdxItmReserve' : 'lessonDateIdxItmReserveFull'}>Reserve</button> 
        : 
        <button onClick={ () => handleCancel(lessonDate, lesson, location)} className="lessonDateIdxItmCancel">Cancel</button>}  
        
        {lessonDate.userHasReservation ? <p className={source === "search" ? "reserved" : "reservedLocShow"}>reserved</p> : <p className={lessonDate.remainingSlots > 0 ? 'remainingSlots' : 'lessonFull'}>{lessonDate.remainingSlots > 0 ? `Available slots: ${lessonDate.remainingSlots}` : "Lesson Full!"}</p>}
      </Column>  */}


      {/* {currentUser ? <Column className={source === "search" ? 'lessonDateIdxItmRCol' : 'locShowIdxItmRCol'}>
        { lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation
        ? 
        <button onClick={ () => handleResClick(lessonDate, lesson, location)} className={lessonDate.remainingSlots > 0 ? 'lessonDateIdxItmReserve' : 'lessonDateIdxItmReserveFull'}>Reserve</button> 
        : 
        <button onClick={ () => handleCancel(lessonDate, lesson, location)} className="lessonDateIdxItmCancel">Cancel</button>}  
        
        {lessonDate.userHasReservation ? <p className={source === "search" ? "reserved" : "reservedLocShow"}>reserved</p> : <p className={lessonDate.remainingSlots > 0 ? 'remainingSlots' : 'lessonFull'}>{lessonDate.remainingSlots > 0 ? `Available slots: ${lessonDate.remainingSlots}` : "Lesson Full!"}</p>}
      </Column> :
      <Column className={source === "search" ? 'lessonDateIdxItmRCol' : 'locShowIdxItmRCol'}>
        <NavLink to='/signup' className='loggedOutSignUp'>Sign up</NavLink> 
      </Column> } */}
    </Row>
  )


}

export default LessonDatesIndexItem;