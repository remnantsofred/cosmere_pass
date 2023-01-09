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

export const getReservation = (reservationId) => (store) => {
  if (store.reservations && store.reservations[reservationId]) return store.reservations[reservationId];
  return null;
};

// THUNK ACTION CREATORS
export const fetchReservations = () => async (dispatch) => {
  const res = await fetch(`/api/reservations`);
  if (res.ok) {
    const reservations = await res.json();
    dispatch(receiveReservations(reservations));
  }
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const res = await fetch(`/api/reservations/${reservationId}`);
  if (res.ok) {
    const reservation = await res.json();
    dispatch(receiveReservation(reservation));
  }
};

export const createReservation = (data) => async (dispatch) => {
  const res = await fetch(`/api/reservations`, {
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
  }
};

// export const updateReservation = (reservation) => async (dispatch) => {
//   const res = await fetch(`/api/reservations/${reservation.id}`, {
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

export const deleteReservation = (reservationId) => async (dispatch) => {
  const res = await fetch(`/api/reservations/${reservationId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeReservation(reservationId));
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