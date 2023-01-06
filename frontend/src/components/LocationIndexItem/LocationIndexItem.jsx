import './LocationIndexItem.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Row from '../row/Row';
import Column from '../column/Column';


export const LocationIndexItem = ({ location }) => {
  const dispatch = useDispatch();
  
  return (
    <Row className="locationIdxItmRow">
      <Column className='locationIdxItmImgCol'>
        <img src={location.imageURL} alt="" className='locationIdxImg'/>
      </Column>
      <Column className='locationIdxItminfoCol'>
        <Link to={`/locations/${location.id}`}><h2>{location.locationName}</h2></Link>

      </Column>
      <Column className='locationIdxitmrightCol'>
        <p>{location.description}</p>
      </Column>
    </Row>
  )
}

export default LocationIndexItem;