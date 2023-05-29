import './ReservationIndexItem.css';
import Row from '../row/Row';
import Panel from '../panel/Panel';
import { useSelector } from 'react-redux';
import { getLocation } from '../../store/location';

export const ReservationIndexItem = ({reservation, type}) =>{
  // const location = useSelector(getLocation(reservation.locationId));

  // attr_accessor :user_reserved, :start_time, :end_time, :status, :location_id 
 


  return (
    <Row className='reservation-index-item-container'>
      <img src="" alt="" />
      {/* <img src={location.imageURL} alt={location.locationName} className='LocShowImg' /> */}
      <Panel className='reservation-index-item-info-panel'>

      </Panel>
      {type == 'upcoming' && <Panel className='reservation-index-item-button-panel'>
        <button className={'lessonDateIdxItmReserve'}> Bring a friend </button>
        <button className={'lessonDateIdxItmReserve'}> Cancel Reservation </button>
      </Panel >}
    </Row>
  )
}


export default ReservationIndexItem