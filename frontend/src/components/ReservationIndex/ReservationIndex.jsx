import './ReservationIndex.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import { useState } from 'react';
import ReservationIndexItem from '../ReservationIndexItem/ReservationIndexItem';
import { getReservations, getReservationsForUser } from '../../store/reservation';
import { NavLink } from 'react-router-dom';

export const ReservationIndex = ({user, type, reservations, handleCancel}) =>{
  
  // user has:   
  // attr_accessor :reservation_datetimes, :lessons_taken, :lessons_reviewed, :upcoming_reservations, :past_reservations, :locations_visited
  
  const selectReservations = (reservations, type) => {
    if (type === 'upcoming'){
      return reservations.filter(reservation => reservation.status === 'upcoming')
    } else {
      return reservations.filter(reservation => reservation.status === 'past')
    }
  }

 
  return (
    <>
      {type === 'upcoming' && 
        <div className='reservation-index-header'>You have {user.upcomingReservations.length} upcoming {user.upcomingReservations.length === 1 ? 'reservation' : 'reservations'}
        </div>}
      {(type === 'upcoming' && user.upcomingReservations.length === 0) && 
          <NavLink 
            className="splashNavLink reservation-index-navlink" 
            to="/search">
            Browse lessons
          </NavLink> }
      {type === 'past' && 
        <div className='reservation-index-header reservation-index'>
          You have taken {user.pastReservations.length} {user.pastReservations.length === 1 ? 'lesson' : 'lessons'}
        </div>}
      {(type === 'past' && user.pastReservations.length === 0) && 
        <NavLink 
          className="splashNavLink reservation-index-navlink" 
          to="/search">
          Browse lessons
        </NavLink> }
      
      {(type === 'upcoming' && user.upcomingReservations.length > 0) &&  
        selectReservations(reservations, 'upcoming').map((reservation, idx)=> 
          <ReservationIndexItem 
            key={idx} 
            reservation={reservation} 
            type={'upcoming'} 
            handleCancel={handleCancel} 
              > 
            </ReservationIndexItem>   )}
      {(type === 'past' && user.pastReservations.length > 0) && 
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