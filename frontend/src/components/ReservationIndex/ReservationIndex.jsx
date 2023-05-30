import './ReservationIndex.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import { useState } from 'react';
import ReservationIndexItem from '../ReservationIndexItem/ReservationIndexItem';
import { getReservations, getReservationsForUser } from '../../store/reservation';

export const ReservationIndex = ({user, type, locations, reservations}) =>{
  
  // user has:   
  // attr_accessor :reservation_datetimes, :lessons_taken, :lessons_reviewed, :upcoming_reservations, :past_reservations, :locations_visited
  

 
  return (
    <>
      {type === 'upcoming' && <div className='reservation-index-header'>You have {user.upcomingReservations.length} upcoming {user.upcomingReservations.length === 1 ? 'reservation' : 'reservations'}</div>}
      {type === 'upcoming' && user.upcomingReservations.length === 0 && <div>Browse classes</div> }
      {type === 'past' && <div className='reservation-index-header'>You have taken {user.pastReservations.length} {user.pastReservations.length === 1 ? 'lesson' : 'lessons'}</div>}
      
      {type === 'upcoming' && user.upcomingReservations.length && reservations.map((reservation, idx)=> <ReservationIndexItem key={idx} reservation={reservation} type={type} locations={locations}> </ReservationIndexItem> )}
      {type === 'past' && user.pastReservations.length && user.pastReservations.map((reservation, idx)=> <ReservationIndexItem key={idx} reservation={reservation} type={type} locations={locations}> </ReservationIndexItem> )}
    </>
  )
  
}


export default ReservationIndex