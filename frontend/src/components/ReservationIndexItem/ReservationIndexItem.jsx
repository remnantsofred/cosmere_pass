import './ReservationIndexItem.css';
import Row from '../row/Row';
import Panel from '../panel/Panel';
import { useSelector } from 'react-redux';
import { getLocation } from '../../store/location';

export const ReservationIndexItem = ({reservation, type, locations}) =>{
  // const location = useSelector(getLocation(reservation.locationId));

  // attr_accessor :user_reserved, :start_time, :end_time, :status, :location_id, 
  // :lesson_title, :lesson_type, :lesson_description, :location_name, :location_description, :lesson, :location
 

  return (
    <Row className='reservation-index-item-container'>
      <img src={reservation.location_image_url} alt={reservation.locationName} className='LocShowImg' />
      <Panel className='reservation-index-item-info-panel'>
        {reservation.lessonType}
        hello, this is the {reservation.locationName}
      </Panel>
      {type == 'upcoming' && <Panel className='reservation-index-item-button-panel'>
        <button className='lessonDateIdxItmReserve reservation-index-button'> Bring a friend </button>
        <button className='lessonDateIdxItmReserve reservation-index-button-cancel'> Cancel Reservation </button>
      </Panel >}
    </Row>
  )
}


export default ReservationIndexItem