import './MapInfoBlurb.css';
import Row from '../row/Row';
import Column from '../column/Column';
import { NavLink, withRouter } from 'react-router-dom';
import { StarIcon } from '../icon/Icon';
import { useHistory } from 'react-router-dom';


export const MapInfoBlurb = ({className="", id="", location}) => {
  const history = useHistory();

  return (  
    <Row className={` ${className}-container MapInfoBlurbContainer`} onClick={() => {history.push(`/locations/${location.id}`)}}>
      <Column className={`${className}-img-col locationIdxItmImgCol`}>
        <img src={location.imageURL} alt="" className='locationIdxImg'/>
      </Column>
      <Column className={`${className}-info-col`}>
        <h3 className={`${className}-lesson-type-text`}>{location.lessonTypes.join(", ")}</h3>
        <NavLink to={`/locations/${location.id}`} className="locationIdxItmLink">{location.locationName}</NavLink>
        <h3 className="locationIdxItmLoc">{location.world}</h3>
        <Row className='LocIdxItmratingsRow'>
          <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4>
          <StarIcon className='starIcon'/>
          <p className='locRevCt'>({location.reviewCount})</p>
        </Row>
      </Column>
    </Row>
  )
}

export default MapInfoBlurb;