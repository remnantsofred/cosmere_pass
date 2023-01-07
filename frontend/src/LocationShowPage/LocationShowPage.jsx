import './LocationShowPage.css';
import Panel from '../components/panel/Panel';
import Panels from '../components/panels';
import Row from '../components/row/Row';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocation, fetchLocation } from '../store/location';
import Loading from '../components/loading/Loading';
import Map from '../components/map';

export const LocationShowPage = () => {
  const { locationId } = useParams();
  const location = useSelector(getLocation(locationId))
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(()=>{
    dispatch(fetchLocation(locationId))
    
  },[dispatch, locationId])

  useEffect(() => {
    if(location){
      setLoaded(true)
      
    }
  })

  if(!loaded){
    return (
      <Loading />
    )
  } else {
    return(
      <Panels className="LocShowPage">
        <Panel className='LocShowPanelL'>
          <Row className='LocShowPanelLRow'>
            <img src={location.imageURL} alt={location.locationName} className='LocShowImg' />
          </Row>
          <Row className='LocShowPanelLRow'>
            <h1>{location.locationName}</h1>
          </Row>
          <Row className='LocShowPanelLRow'>
            {/* reviews go here */}
          </Row>
          <Row className='LocShowPanelLRow'>
            <p>{location.description}</p>
          </Row>
          <Row className='LocShowPanelLRow LocSchedule'>

          </Row>
          <Row className='LocShowPanelLRow LocReviews'>

          </Row>
        </Panel>
        <Panel className='LocShowPanelR'>
          <ul className='LocShowMap'>
            <Map />
          </ul>
          <Row className='LocShowPanelRRow'>
          </Row>
          <Row className='LocShowPanelRRow'>
          </Row>
          <Row className='LocShowPanelRRow'>
          </Row>
          <Row className='LocShowPanelRRow'>
          </Row>
        </Panel>


      </Panels>
    )
  }
}

export default LocationShowPage;