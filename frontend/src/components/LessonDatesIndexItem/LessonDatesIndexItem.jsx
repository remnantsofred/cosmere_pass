import './LessonDatesIndexItem.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from '../row/Row';
import Column from '../column/Column';
import { Link, NavLink, useParams } from 'react-router-dom';
import { getLocation, fetchLocation } from '../../store/location';
import { formatDate, formatTime, timeBetween } from '../../utils/date_util';


export const LessonDatesIndexItem = ({lessonDate, location, lesson}) => {
  const dispatch = useDispatch();
  // const { fullStatus, setFullStatus} = useState(false)
  
  const handleReserve = ()=> {
    console.log('reserve')
  }

  // if (lessonDate.remainingSlots === 0) {
  //   setFullStatus(true)
  // }

  return (
    <Row className="lessonDateIdxItmRow">
      <Column className='lessonDateIdxItmTimeCol'>
        <p className="lessonDateIdxItmTime startTime">{formatTime(lessonDate.startTime)}</p>
        <p className="lessonDateIdxItmTime duration">{timeBetween(lessonDate.startTime, lessonDate.endTime)} min</p>
      </Column>
      <Column className="lessonDateIdxItmCol2">
        <NavLink to={`/lessons/${lesson.id}`} className="lessonDateIdxItmLink">{lesson.title}</NavLink>
        <h3 className="lessonDateIdxItmRating"></h3>
      </Column>
      <Column className='lessonDateIdxItmCol3'>
        <NavLink to={`/locations/${location.id}`} className="lessonDateIdxItmLocLink">{location.locationName}</NavLink>
        <h3 className="lessonDateIdxItmLessonType">{lesson.lessonType}</h3>
        
      </Column>
      {/* <Column className='lessonDateIdxItmImgCol'>
        <img src={lesson.photoURL} alt="" className='lessonIdxImg'/>
      </Column> */}
      <Column className='lessonDateIdxItmRCol'>
        {lessonDate.remainingSlots > 0 && <button onClick={handleReserve} className={lessonDate.remainingSlots > 0 ? 'lessonDateIdxItmReserve' : 'lessonDateIdxItmReserveFull'}>Reserve</button>  }
        <p className='remainingSlots'>{lessonDate.remainingSlots > 0 ? `Available slots: ${lessonDate.remainingSlots}` : "Lesson Full!"}</p>
      </Column>
    </Row>
  )


}

export default LessonDatesIndexItem;