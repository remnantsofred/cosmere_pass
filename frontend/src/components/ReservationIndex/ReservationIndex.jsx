import './ReservationIndex.css';
import ReservationIndexItem from '../ReservationIndexItem/ReservationIndexItem';
import { NavLink } from 'react-router-dom';
import { sortByEarliestToLatestStartTime, sortByMostRecentStartTime } from '../../utils/sorting_util';

export const ReservationIndex = ({user, type, reservations, handleCancel}) =>{
  
 
  return (
    <>
      {type === 'upcoming' && 
        <div className='reservation-index-header'>You have {reservations.length} upcoming {reservations.length === 1 ? 'reservation' : 'reservations'}
        </div>}
      {(type === 'upcoming' && reservations.length === 0) && 
          <NavLink 
            className="splashNavLink reservation-index-navlink" 
            to="/search?start_time=0">
            Browse lessons
          </NavLink> }
      {type === 'past' && 
        <div className='reservation-index-header reservation-index'>
          You have taken {reservations.length} {reservations.length === 1 ? 'lesson' : 'lessons'}
        </div>}
      {(type === 'past' && reservations.length === 0) && 
        <NavLink 
          className="splashNavLink reservation-index-navlink" 
          to="/search?start_time=0">
          Browse lessons
        </NavLink> }
      
      {(type === 'upcoming' && reservations.length > 0) &&  
        sortByEarliestToLatestStartTime(reservations).map((reservation, idx)=> 
          <ReservationIndexItem 
            key={idx} 
            reservation={reservation} 
            type={'upcoming'} 
            handleCancel={handleCancel} 
              > 
            </ReservationIndexItem>   )}
      {(type === 'past' && reservations.length > 0) && 
        sortByMostRecentStartTime(reservations).map((reservation, idx)=> 
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