import './IndexToggleBar.css';
import React, { useState, useEffect } from 'react';
import Row from '../row/Row';
import { NavLink } from 'react-router-dom';

export const IndexToggleBar = () => {
  const [indexType, setIndexType] = useState('lesson');

  return (
    <> 
      <Row className="IndexToggleBar">
      <NavLink to={`/lessonDates/`} onClick={() => setIndexType('lesson')} className='LessonsToggleLabel' >
        Lessons
      </NavLink>
      <NavLink to={`/locations/`} onClick={() => setIndexType('location')} className='LocationsToggleLabel' >
        Locations
      </NavLink>

      </Row>
    </>
  )
}

export default IndexToggleBar;