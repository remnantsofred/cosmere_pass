import './LocationIndexItem.css';
import { useDispatch } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Row from '../row/Row';
import Column from '../column/Column';
import { useEffect } from 'react';
import { StarIcon } from '../icon/Icon';


export const LocationIndexItem = withRouter(({ myLocation, lessonIds, history }) => {
  const dispatch = useDispatch();

 
  
  return (
    <Row className="locationIdxItmRow">
      <Column className='locationIdxItmImgCol'>
        <img onClick={() => {history.push(`/locations/${myLocation.id}`)}} src={myLocation.imageURL} alt="" className='locationIdxImg'/>
      </Column>
      <Column className='locationIdxItminfoCol'>
        <h3 className="locationIdxItmLessonType">{myLocation.lessonTypes.join(", ")}</h3>
        <NavLink to={`/locations/${myLocation.id}`} className="locationIdxItmLink">{myLocation.locationName}</NavLink>
        <h3 className="locationIdxItmLoc">{myLocation.world}</h3>
        <Row className='LocIdxItmratingsRow'>
          <h4 className="locationIdxItmRating">{myLocation.averageRating.toFixed(1)}</h4>
          <StarIcon className='starIcon'/>
          <p className='locRevCt'>({myLocation.reviewCount})</p>
        </Row>
      </Column>
      <Column className='locationIdxitmrightCol'>
        <p className='locationIdxItmDesc'>{myLocation.description}</p>
      </Column>
    </Row>
  )
})

export default LocationIndexItem;