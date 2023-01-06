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
import { getLocations, fetchLocations } from '../../store/location';
import LocationIndexItem from '../LocationIndexItem/LocationIndexItem';

export const LocationsIndexPage = ({children, id='', className="LocationsIndexPage"}) => {
  const locations = useSelector(getLocations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocations())
  }, [dispatch])


  return (
    <Panels id={id} className={className}>
     
     <Panel className='locationsIdxleftPanel'>
       <ul className='locationsIdxUL'>
         {locations?.map((location, idx) => <LocationIndexItem location={location} key={idx} />)}
         {children}
       </ul>
     </Panel>
     <Panel className='locationssIdxrightPanel'>
       {/* map goes here */}
     </Panel>

   </Panels> 
  )
}

export default LocationsIndexPage;