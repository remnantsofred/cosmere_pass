import './ReservationIndexItem.css';
import Row from '../row/Row';
import Panel from '../panel/Panel';
import Column from '../column/Column';
import { formatTime, formatDateWithDayShortAlt } from '../../utils/date_util'


export const ReservationIndexItem = ({reservation, type, handleCancel}) =>{


  
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
        <button className='reservation-index-button' onClick={ () => handleCancel(reservation, 'invite')}> Bring a friend </button>
        <button className='reservation-index-button-cancel' onClick={ () => handleCancel(reservation, 'cancel')}> Cancel Reservation </button>
      </Panel >}
    </Row>
  )
}


export default ReservationIndexItem