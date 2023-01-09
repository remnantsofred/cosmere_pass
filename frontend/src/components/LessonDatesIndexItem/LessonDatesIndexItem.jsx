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

// reservations passed from SearchPage component are just reservations for this specific lessonDate
export const LessonDatesIndexItem = ({lessonDate, location, lesson, handleResClick, handleCancel}) => {
  const dispatch = useDispatch();



  return (
    <Row className="lessonDateIdxItmRow">
      <Column className='lessonDateIdxItmTimeCol'>
        <p className="lessonDateIdxItmTime startTime">{formatTime(lessonDate.startTime)}</p>
        <p className="lessonDateIdxItmTime duration">{timeBetween(lessonDate.startTime, lessonDate.endTime)} min</p>
      </Column>
      <Column className="lessonDateIdxItmCol2">
        <NavLink to={`/lessons/${lesson.id}`} className="lessonDateIdxItmLink">{lesson.title}</NavLink>
        <Row className='LocIdxItmratingsRow'>
          <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4>
          <StarIcon className='starIcon'/>
          <p className='locRevCt'>({location.reviewCount})</p>
        </Row>
      </Column>
      <Column className='lessonDateIdxItmCol3'>
        <NavLink to={`/locations/${location.id}`} className="lessonDateIdxItmLocLink">{location.locationName}</NavLink>
        <h3 className="lessonDateIdxItmLessonType">{lesson.lessonType}</h3>
        
      </Column>
      {/* <Column className='lessonDateIdxItmImgCol'>
        <img src={lesson.photoURL} alt="" className='lessonIdxImg'/>
      </Column> */}
      <Column className='lessonDateIdxItmRCol'>
        {lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation ? <button onClick={ () => handleResClick(lessonDate, lesson, location)} className={lessonDate.remainingSlots > 0 ? 'lessonDateIdxItmReserve' : 'lessonDateIdxItmReserveFull'}>Reserve</button> : 
        <button onClick={ () => handleCancel(lessonDate)} className="lessonDateIdxItmCancel">Cancel</button>}  
        
        {lessonDate.userHasReservation ? <p className="reserved">reserved</p> : <p className={lessonDate.remainingSlots > 0 ? 'remainingSlots' : 'lessonFull'}>{lessonDate.remainingSlots > 0 ? `Available slots: ${lessonDate.remainingSlots}` : "Lesson Full!"}</p>}
      </Column>
    </Row>
  )


}

export default LessonDatesIndexItem;