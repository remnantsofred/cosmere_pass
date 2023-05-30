import './ReservationIndexItem.css';
import Row from '../row/Row';
import Panel from '../panel/Panel';
import { useSelector } from 'react-redux';
import { getLocation } from '../../store/location';
import { formatDate, formatTime, timeBetween, formatDateWithDay, formatDateWithDayShortAlt } from '../../utils/date_util';

export const ReservationIndexItem = ({reservation, type}) =>{
  // const location = useSelector(getLocation(reservation.locationId));

  // attr_accessor :user_reserved, :start_time, :end_time, :status, :location_id, 
  // :lesson_title, :lesson_type, :lesson_description, :location_name, :location_description, :lesson, :location
 

  return (
    <Row className='reservation-index-item-container'>
      <img src={reservation.lesson_image_url} alt={reservation.locationName} className='LocShowImg' />
      <Panel className='reservation-index-item-info-panel'>
        <p className='lessonDateIdxItmTime startTimeLoc'>{reservation.lessonTitle}</p>
        <p className='lessonDateIdxItmTime startTime'>{reservation.locationName}</p>
        <p className="lessonDateIdxItmTime duration">{formatDateWithDayShortAlt(reservation.startTime)}</p>
        <p className="lessonDateIdxItmTime duration">{formatTime(reservation.startTime)}-{formatTime(reservation.endTime)}</p>
      </Panel>
      {type == 'upcoming' && <Panel className='reservation-index-item-button-panel'>
        <button className='lessonDateIdxItmReserve reservation-index-button'> Bring a friend </button>
        <button className='lessonDateIdxItmReserve reservation-index-button-cancel'> Cancel Reservation </button>
      </Panel >}
    </Row>
  )
}


export default ReservationIndexItem