import './LocationIndexItem.css';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Row from '../row/Row';
import Column from '../column/Column';
import { useEffect } from 'react';


export const LocationIndexItem = ({ location, lessonIds }) => {
  const dispatch = useDispatch();

 
  
  return (
    <Row className="locationIdxItmRow">
      <Column className='locationIdxItmImgCol'>
        <img src={location.imageURL} alt="" className='locationIdxImg'/>
      </Column>
      <Column className='locationIdxItminfoCol'>
        <h3 className="locationIdxItmLessonType">{location.lessonTypes.join(" | ")}</h3>
        <NavLink to={`/locations/${location.id}`} className="locationIdxItmLink">{location.locationName}</NavLink>
        <h3 className="locationIdxItmLoc">{location.locationName}</h3>
        <h3 className="locationIdxItmRating"></h3>

      </Column>
      <Column className='locationIdxitmrightCol'>
        <p className='locationIdxItmDesc'>{location.description}</p>
      </Column>
    </Row>
  )
}

export default LocationIndexItem;