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
import { getLocations, fetchLocations } from '../../store/location';
import Loading from '../loading/Loading';
import Map from '../map';
import { getItemByID } from '../../utils/general_util'
// import  GoogleApiWrapper  from '../map';


export const LessonsIndexPage = ({children, id='', className="LessonsIndexPage"}) => {
  const lessons = useSelector(getLessons);
  const locations = useSelector(getLocations);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchLessons())
    dispatch(fetchLocations())
  }, [])

  useEffect(() => {
    if (locations && lessons && locations.length && lessons.length) {
      setLoaded(true)
    }
  },[dispatch, locations, lessons])
  

  if (!loaded) {
    return (
      <Loading />
    )
  } else {
    return (
      <Panels id={id} className={className}>
        <Panel className='lessonsIdxleftPanel'>
          <ul className='lessonsIdxUL'>
            {lessons?.map((lesson, idx) => <LessonIndexItem lesson={lesson} key={idx} location={getItemByID(lesson.locationId, locations)}/>)}
            {children}
          </ul>
        </Panel>
        <Panel className='lessonsIdxrightPanel'>
          <Map />
        </Panel>
      </Panels> 
    )
  }
}

export default LessonsIndexPage;