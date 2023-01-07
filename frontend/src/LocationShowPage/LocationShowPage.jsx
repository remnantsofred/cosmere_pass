import './LocationShowPage.css';
import Panel from '../components/panel/Panel';
import Panels from '../components/panels';
import Row from '../components/row/Row';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocation, fetchLocation } from '../store/location';
import Loading from '../components/loading/Loading';

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
      <Panels>
        <Panel>
          <Row>
            <h1>{location.locationName}</h1>
            <textarea name="" id="" cols="30" rows="10">{location.description}</textarea>
          </Row>
        </Panel>


      </Panels>
    )
  }
}

export default LocationShowPage;