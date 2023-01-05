import './LessonIndexItem.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from '../row/Row';
import Column from '../column/Column';
import { Link } from 'react-router-dom';

export const LessonIndexItem = ({ lesson }) => {
  const dispatch = useDispatch();
  
  return (
    <Row className="lessonIdxItmRow">
      <Column className='lessonIdxItmImgCol'>
        <img src="" alt="" />
        {/* <h3>{lesson.location.location_name}</h3> */}
      </Column>
      <Column className='lessonIdxItminfoCol'>
        <h3 className="lessonIdxItmLessonType">{lesson.lessonType}</h3>
        <Link to={`/lessons/${lesson.id}`}><h2>{lesson.title}</h2></Link>
        <h3>{lesson.locationID}</h3>
      </Column>
      <Column className='lessonIdxitmrightCol'>
        <p>{lesson.description}</p>
      </Column>
    </Row>
  )
}

export default LessonIndexItem;