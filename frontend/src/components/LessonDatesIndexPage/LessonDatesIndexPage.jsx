import './LessonDatesIndexPage.css';
import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Row from '../row/Row';
import { getLessonDates, fetchLessonDates } from '../../store/lessonDates';
import { getLessons, fetchLessons } from '../../store/lesson';
import { getLocations, fetchLocations } from '../../store/location';
import Loading from '../loading/Loading';
import Map from '../map';
import LessonDatesIndexItem from '../LessonDatesIndexItem';
import { getItemByID } from '../../utils/general_util'


export const LessonDatesIndexPage = ({children, id='', className="LessonDatesIndexPage"}) => {
  const lessonDates = useSelector(getLessonDates);
  const lessons = useSelector(getLessons);
  const locations = useSelector(getLocations);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchLessonDates())
    dispatch(fetchLessons())
    dispatch(fetchLocations())
  }, [])

  useEffect(() => {
    if (locations && lessons && lessonDates && locations.length && lessons.length && lessonDates.length) {
      setLoaded(true)
    }
  },[dispatch, locations, lessons, lessonDates])


  if (!loaded) {
    return (
      <Loading />
    )
  } else {
    return (
      <Panels id={id} className={className}>
        <Panel className='lessonDatesIdxleftPanel'>
          <ul className='lessonDatesIdxUL'>
            {lessonDates?.map((lessonDate, idx) => <LessonDatesIndexItem lessonDate={lessonDate} lesson={getItemByID(lessonDate.lessonId)} location={getItemByID(getItemByID(lessonDate.lessonId).locationId)} key={idx} />)}
            {children}
          </ul>
        </Panel>
        <Panel className='lessonDatesIdxrightPanel'>
          <Map />
        </Panel>
      </Panels> 
    )
  }
}

export default LessonDatesIndexPage;