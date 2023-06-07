import './ReservationIndex.css';
import ReservationIndexItem from '../ReservationIndexItem/ReservationIndexItem';
import { NavLink } from 'react-router-dom';

export const ReservationIndex = ({user, type, reservations, handleCancel}) =>{
  
  // user has:   
  // attr_accessor :reservation_datetimes, :lessons_taken, :lessons_reviewed, :upcoming_reservations, :past_reservations, :locations_visited


  const selectReservations = (reservations, type) => {


    let filtered = []

    if (type === 'upcoming'){
      filtered = reservations.filter(reservation => reservation.status === 'upcoming')
    } else {
      filtered = reservations.filter(reservation => reservation.status === 'past')
    }

    const sortedReservations = filtered.sort((reservation1, reservation2) => {
      if (reservation1.startTime > reservation2.startTime) {
        return 1
      } else if (reservation1.startTime < reservation2.startTime) {
        return -1
      } else {
        return 0
      }
    })

    return sortedReservations;
    
  }



 
  return (
    <>
      {type === 'upcoming' && 
        <div className='reservation-index-header'>You have {selectReservations(reservations, 'upcoming').length} upcoming {selectReservations(reservations, 'upcoming').length === 1 ? 'reservation' : 'reservations'}
        </div>}
      {(type === 'upcoming' && selectReservations(reservations, 'upcoming').length === 0) && 
          <NavLink 
            className="splashNavLink reservation-index-navlink" 
            to="/search">
            Browse lessons
          </NavLink> }
      {type === 'past' && 
        <div className='reservation-index-header reservation-index'>
          You have taken {selectReservations(reservations, 'past').length} {selectReservations(reservations, 'past').length === 1 ? 'lesson' : 'lessons'}
        </div>}
      {(type === 'past' && selectReservations(reservations, 'past').length === 0) && 
        <NavLink 
          className="splashNavLink reservation-index-navlink" 
          to="/search">
          Browse lessons
        </NavLink> }
      
      {(type === 'upcoming' && selectReservations(reservations, 'upcoming').length > 0) &&  
        selectReservations(reservations, 'upcoming').map((reservation, idx)=> 
          <ReservationIndexItem 
            key={idx} 
            reservation={reservation} 
            type={'upcoming'} 
            handleCancel={handleCancel} 
              > 
            </ReservationIndexItem>   )}
      {(type === 'past' && selectReservations(reservations, 'past').length > 0) && 
        selectReservations(reservations, 'past').map((reservation, idx)=> 
          <ReservationIndexItem 
            key={idx} 
            reservation={reservation} 
            type={'past'} 
            > 
          </ReservationIndexItem> )}
    </>
  )
  
}


export default ReservationIndex