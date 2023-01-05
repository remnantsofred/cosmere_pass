import './LessonsIndexPage.css';
import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Row from '../row/Row';
import LessonIndexItem from '../LessonIndexItem/LessonIndexItem';
import { getLessons, fetchLessons } from '../../store/lesson';


export const LessonsIndexPage = ({children, id='', className="LessonsIndexPage"}) => {
  const lessons = useSelector(getLessons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLessons())
  }, [dispatch])

  return (
    <Panels id={id} className={className}>
     
      <Panel className='lessonsIdxleftPanel'>
        <ul className='lessonsIdxUL'>
          {lessons?.map((lesson, idx) => <LessonIndexItem lesson={lesson} key={idx} />)}
          {children}
        </ul>
      </Panel>
      <Panel className='lessonsIdxrightPanel'>
        {/* map goes here */}
      </Panel>

    </Panels> 

  )

}

export default LessonsIndexPage;