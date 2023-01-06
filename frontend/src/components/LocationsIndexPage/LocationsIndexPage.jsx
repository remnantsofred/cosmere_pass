import './LocationsIndexPage.css';
import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Row from '../row/Row';
import { getLessons, fetchLessons } from '../../store/lesson';
import { getLocations, fetchLocations } from '../../store/location';
import LocationIndexItem from '../LocationIndexItem/LocationIndexItem';
import Loading from '../loading/Loading';
import Map from '../map';

export const LocationsIndexPage = ({children, id='', className="LocationsIndexPage"}) => {
  const lessons = useSelector(getLessons);
  const locations = useSelector(getLocations);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchLessons())
    dispatch(fetchLocations())
  }, [])

  useEffect(() => {
    if (locations && lessons) {
      setLoaded(true)
    }
  },[dispatch, locations, lessons])

  const getLocation = (locationId) => {
    for (const location of locations) {
      if (location.id === locationId) {
        return location;
      }
    }
  }


  if (!loaded) {
    return (
      <Loading />
    )
  } else {
    return (
      <Panels id={id} className={className}>
      
        <Panel className='locationsIdxleftPanel'>
          <ul className='locationsIdxUL'>
            {locations?.map((location, idx) => <LocationIndexItem location={location} key={idx} />)}
            {children}
          </ul>
        </Panel>
        <Panel className='locationssIdxrightPanel'>
          <Map />
        </Panel>
      </Panels> 
    )
  }
}

export default LocationsIndexPage;