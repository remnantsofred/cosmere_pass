import './ReservationIndexItem.css';
import Row from '../row/Row';
import Panel from '../panel/Panel';
import Column from '../column/Column';
import { useSelector } from 'react-redux';
import { formatDate, formatTime, timeBetween, formatDateWithDay, formatDateWithDayShortAlt } from '../../utils/date_util';
import ReservationCancelModal from '../ReservationCancelModal/ReservationCancelModal';
import { getLocation } from '../../store/location';
import { getLessonDate } from '../../store/lessonDates';
import { getLesson } from '../../store/lesson';


export const ReservationIndexItem = ({reservation, type, handleCancel, lessonDates, locations}) =>{
  // const reservationLocation = useSelector(getLocation(reservation.locationId));

  // attr_accessor :user_reserved, :start_time, :end_time, :status, :location_id, 
  // :lesson_title, :lesson_type, :lesson_description, :location_name, :location_description, 
 
  const getWorld = (locationName) => {
    if (locationName === "Hallandren"){
      return "Nalthis" 
    } else if (locationName === "Elendel" || locationName === "Luthadel" || locationName === "Homeland"){
      return"Scadrial"
    } else {
      return "Roshar"
    }
  }


  

  return (
    <Row className='reservation-index-item-container'>
      <Column className='reservation-index-item-img-col'>
        <img src={reservation.lessonImageUrl} alt={reservation.locationName} className='reservation-lesson-img' />
      </Column>
      <Panel className='reservation-index-item-info-panel'>
        <p className='lessonDateIdxItmTime startTimeLoc'>{reservation.lessonTitle}</p>
        <p className='lessonDateIdxItmTime startTime'>{reservation.locationName} - {getWorld(reservation.locationName)}</p>
        <br />
        <p className="lessonDateIdxItmTime duration">{formatDateWithDayShortAlt(reservation.startTime)}</p>
        <p className="lessonDateIdxItmTime duration">{formatTime(reservation.startTime)}-{formatTime(reservation.endTime)}</p>
      </Panel>
      {type == 'upcoming' && <Panel className='reservation-index-item-button-panel'>
        <button className='reservation-index-button'> Bring a friend </button>
        <button className='reservation-index-button-cancel' onClick={ () => handleCancel(getLessonDate(reservation.lessonDateId), getLesson(reservation.lessonId), getLocation(reservation.locationId))}> Cancel Reservation </button>
      </Panel >}
    </Row>
  )
}


export default ReservationIndexItem