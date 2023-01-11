import './LessonIndexItem.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from '../row/Row';
import Column from '../column/Column';
import { Link, NavLink, useParams } from 'react-router-dom';
import { getLocation, fetchLocation } from '../../store/location';


export const LessonIndexItem = ({ lesson, location }) => {
  const dispatch = useDispatch();

  
  return (
    <Row className="lessonIdxItmRow">
      <Column className='lessonIdxItmImgCol'>
        <img src={lesson.photoURL} alt="" className='lessonIdxImg'/>
      </Column>
      <Column className='lessonIdxItminfoCol'>
        <h3 className="lessonIdxItmLessonType">{lesson.lessonType}</h3>
        {/* <NavLink to={`/lessons/${lesson.id}`} className="lessonIdxItmLink">{lesson.title}</NavLink><br /> */}
        <p className="lessonIdxItmLessonTitle">{lesson.title}</p>
        <NavLink to={`/locations/${lesson.locationId}`} className="lessonIdxItmLocLink">{location.locationName}</NavLink>
        <h3 className="lessonIdxItmRating"></h3>
      </Column>
      <Column className='lessonIdxitmrightCol'>
        <p className='lessonIdxItmDesc'>{lesson.description}</p>
      </Column>
    </Row>
  )
}

export default LessonIndexItem; 