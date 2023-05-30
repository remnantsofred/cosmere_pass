import './ReservationIndex.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import { useState } from 'react';
import ReservationIndexItem from '../ReservationIndexItem/ReservationIndexItem';

export const ReservationIndex = ({user, type}) =>{
  
  // user has:   
  // attr_accessor :reservation_datetimes, :lessons_taken, :lessons_reviewed, :upcoming_reservations, :past_reservations, :locations_visited
 
  return (
    <>
      {type == 'upcoming' && <div className='reservation-index-header'>You have {user.upcomingReservations.length} upcoming {user.upcomingReservations.length == 1 ? 'reservation' : 'reservations'}</div>}
      {type == 'upcoming' && user.upcomingReservations.length == 0 && <div>Browse classes</div> }
      {type == 'past' && <div className='reservation-index-header'>You have taken {user.pastReservations.length} {user.pastReservations.length == 1 ? 'class' : 'classes'}</div>}
      
      {type == 'upcoming' && user.upcomingReservations.length && user.upcomingReservations.map((reservation, idx)=> <ReservationIndexItem key={idx} reservation={reservation} type={type}> </ReservationIndexItem> )}
      {type == 'past' && user.pastReservations.length && user.pastReservations.map((reservation, idx)=> <ReservationIndexItem key={idx} reservation={reservation} type={type}> </ReservationIndexItem> )}
    </>
  )
  
}


export default ReservationIndex