import './ReservationIndex.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import { useState } from 'react';
import ReservationIndexItem from '../ReservationIndexItem/ReservationIndexItem';
import { getReservations, getReservationsForUser } from '../../store/reservation';
import { NavLink } from 'react-router-dom';

export const ReservationIndex = ({user, type, locations, reservations}) =>{
  
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
      {type === 'upcoming' && <div className='reservation-index-header'>You have {user.upcomingReservations.length} upcoming {user.upcomingReservations.length === 1 ? 'reservation' : 'reservations'}</div>}
      {type === 'upcoming' && user.upcomingReservations.length === 0 && <NavLink className="splashNavLink" to="/search">Browse lessons</NavLink> }
      {type === 'past' && <div className='reservation-index-header'>You have taken {user.pastReservations.length} {user.pastReservations.length === 1 ? 'lesson' : 'lessons'}</div>}
      
      {type === 'upcoming' && user.upcomingReservations.length && selectReservations(reservations, 'upcoming').map((reservation, idx)=> <ReservationIndexItem key={idx} reservation={reservation} type={'upcoming'} locations={locations}> </ReservationIndexItem> )}
      {type === 'past' && user.pastReservations.length && selectReservations(reservations, 'past').map((reservation, idx)=> <ReservationIndexItem key={idx} reservation={reservation} type={'past'} locations={locations}> </ReservationIndexItem> )}
    </>
  )
  
}


export default ReservationIndex