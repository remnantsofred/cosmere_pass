import './LessonDatesIndexItem.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from '../row/Row';
import Column from '../column/Column';
import { Link, NavLink, useParams } from 'react-router-dom';
import { getLocation, fetchLocation } from '../../store/location';

export const LessonDatesIndexItem = ({lessonDate, location, lesson}) => {
  const dispatch = useDispatch();
  
  return (
    <Row className="lessonDateIdxItmRow">
      <Column className='lessonDateIdxItmImgCol'>
        {/* <img src={lesson.photoURL} alt="" className='lessonIdxImg'/> */}
      </Column>
      <Column className='lessonDateIdxItminfoCol'>
        <h3 className="lessonDateIdxItmLessonType">{lesson.lessonType}</h3>
        <NavLink to={`/lessons/${lesson.id}`} className="lessonIdxItmLink">{lesson.title}</NavLink><br />
        {/* <NavLink to={`/locations/${location.id}`} className="lessonIdxItmLocLink">{location.locationName}</NavLink> */}
        <h3 className="lessonIdxItmRating"></h3>
      </Column>
      <Column className='lessonIdxitmrightCol'>
        <p className='lessonIdxItmDesc'>{lesson.description}</p>
      </Column>
    </Row>
  )


}

export default LessonDatesIndexItem;