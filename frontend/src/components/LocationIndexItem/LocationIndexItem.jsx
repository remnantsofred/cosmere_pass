import './LocationIndexItem.css';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Row from '../row/Row';
import Column from '../column/Column';
import { useEffect } from 'react';
import { StarIcon } from '../icon/Icon';


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
        <h3 className="locationIdxItmLoc">{location.world}</h3>
        <Row className='LocIdxItmratingsRow'>
          <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4>
          <StarIcon className='starIcon'/>
          <p className='locRevCt'>({location.reviewCount})</p>
        </Row>
      </Column>
      <Column className='locationIdxitmrightCol'>
        <p className='locationIdxItmDesc'>{location.description}</p>
      </Column>
    </Row>
  )
}

export default LocationIndexItem;