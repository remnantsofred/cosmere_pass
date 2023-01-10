import csrfFetch from "./csrf";

export const RECEIVE_LESSONDATES = "lessonDates/RECEIVE_LESSONDATES";
export const RECEIVE_LESSONDATE = "lessonDates/RECEIVE_LESSONDATE";
export const REMOVE_LESSONDATE = "lessonDates/REMOVE_LESSONDATE";

export const receiveLessonDates = (lessonDates) => ({
  type: RECEIVE_LESSONDATES,
  lessonDates,
});

export const receiveLessonDate = (lessonDate) => ({
  type: RECEIVE_LESSONDATE,
  lessonDate,
});

export const removeLessonDate = (lessonDateId) => ({
  type: REMOVE_LESSONDATE,
  lessonDateId,
});


export const getLessonDates = (store) => {
  if (store.lessonDates) return Object.values(store.lessonDates);
  return [];
};

export const getLessonDatesForLocation = (locationId) => (store) => {
  if (store.lessonDates) {
    const lessonDates = Object.values(store.lessonDates).filter(lessonDate => lessonDate.locationId.toString() === locationId);
    return lessonDates;
  }
  return [];

};

export const getLessonDate = (lessonDateId) => (store) => {
  if (store.lessonDates && store.lessonDates[lessonDateId]) return store.lessonDates[lessonDateId];
  return null;
};

// THUNK ACTION CREATORS
export const fetchLessonDates = () => async (dispatch) => {
  const res = await fetch(`/api/lesson_dates`);
  if (res.ok) {
    const lessonDates = await res.json();
    dispatch(receiveLessonDates(lessonDates));
  }
  return Promise.resolve();
};

export const fetchLessonDate = (lessonDateId) => async (dispatch) => {
  const res = await fetch(`/api/lesson_dates/${lessonDateId}`);
  if (res.ok) {
    const lessonDate = await res.json();
    dispatch(receiveLessonDate(lessonDate));
  }
};

export const createLessonDate = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/lesson_dates`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const lessonDate = await res.json();
    dispatch(receiveLessonDate(lessonDate));
  }
};

export const updateLessonDate = (lessonDate) => async (dispatch) => {
  const res = await csrfFetch(`/api/lesson_dates/${lessonDate.id}`, {
    method: "PATCH",
    body: JSON.stringify(lessonDate),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const newLessonDate = await res.json();
    dispatch(receiveLessonDate(newLessonDate));
  }
};

export const deleteLessonDate = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/lesson_dates/${id}`, {
    method: "DELETE"
  });
  // USE ARGUMENT ID, SINCE RES DOESNT RETURN ANYTHING!
  if (res.ok) {
    dispatch(removeLessonDate(id));
  }
};

const lessonDatesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_LESSONDATES:
      return { ...newState, ...action.lessonDates };
    case RECEIVE_LESSONDATE:
      return { ...newState, [action.lessonDate.id]: action.lessonDate };
    case REMOVE_LESSONDATE:
      delete newState[action.lessonDateId];
      return newState;
    default:
      return state;
  }
};

export default lessonDatesReducer;

