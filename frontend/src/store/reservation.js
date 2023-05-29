import csrfFetch from "./csrf";
import { fetchLessonDate } from "./lessonDates";
import { restoreSession } from "./session";

export const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS";
export const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION";
export const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION";

export const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  reservations,
});

export const receiveReservation = (reservation) => ({
  type: RECEIVE_RESERVATION,
  reservation,
});

export const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION,
  reservationId,
});

export const getReservations = (store) => {
  if (store.reservations) return Object.values(store.reservations);
  return [];
};

export const getReservationsForUser = (userId) => (store) => {
  if (store.reservations) {
    const userReservations = Object.values(store.reservations).filter(reservation => reservation.studentId === userId)
    return userReservations
  }
  return [];
}

export const getReservation = (reservationId) => (store) => {
  if (store.reservations && store.reservations[reservationId]) return store.reservations[reservationId];
  return null;
};

// THUNK ACTION CREATORS
export const fetchReservations = () => async (dispatch) => {
  const res = await fetch(`/api/reservations`);
  // console.log("why?")
  if (res.ok) {
    const reservations = await res.json();
    console.log(reservations, 'reserations')
    dispatch(receiveReservations(reservations));
  }
  return Promise.resolve();
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const res = await fetch(`/api/reservations/${reservationId}`);
  if (res.ok) {
    const reservation = await res.json();
    dispatch(receiveReservation(reservation));
  }
  return Promise.resolve();
};

export const createReservation = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const reservation = await res.json();
    dispatch(receiveReservation(reservation));
    dispatch(fetchLessonDate(data.lesson_date_id));
    dispatch(restoreSession());
  }
};
// // for createReservation above data looks like this:   
// const data = {
//   student_id: currentUser.id,
//   lesson_date_id: lessonDate.id
// }


// export const updateReservation = (reservation) => async (dispatch) => {
//   const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
//     method: "PATCH",
//     body: JSON.stringify(reservation),
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   if (res.ok) {
//     const newReservation = await res.json();
//     dispatch(receiveReservation(newReservation));
//   }
// };

export const deleteReservation = (id, lessonDateId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${id}`, {
    method: "DELETE", 
  });
  if (res.ok) {
    dispatch(removeReservation(id));
    dispatch(fetchLessonDate(lessonDateId));
    dispatch(restoreSession());
  }
};

// REDUCER
const reservationsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      return { ...newState, ...action.reservations };
    case RECEIVE_RESERVATION:
      return { ...newState, [action.reservation.id]: action.reservation };
    case REMOVE_RESERVATION:
      delete newState[action.reservationId];
      return newState;
    default:
      return state;
  }
};

export default reservationsReducer;