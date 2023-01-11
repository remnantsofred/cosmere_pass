import csrfFetch from "./csrf";

export const RECEIVE_LESSONS = "lessons/RECEIVE_LESSONS";
export const RECEIVE_LESSON = "lessons/RECEIVE_LESSON";
export const REMOVE_LESSON = "lessons/REMOVE_LESSON";

export const receiveLessons = (lessons) => ({
  type: RECEIVE_LESSONS,
  lessons,
});

export const receiveLesson = (lesson) => ({
  type: RECEIVE_LESSON,
  lesson,
});

export const removeLesson = (lessonId) => ({
  type: REMOVE_LESSON,
  lessonId,
});


export const getLessons = (store) => {
  if (store.lessons) return Object.values(store.lessons);
  return [];
};

export const getLessonsForLocation = (locationId) => (store) => {
  if (store.lessons) {
    const lessons = Object.values(store.lessons).filter(lesson => {
      if (lesson === undefined || lesson.locationId === undefined) {
        console.log('lesson', lesson)
      }
      return lesson.locationId.toString() === locationId}
      );
    return lessons;
  }
  return [];
};

export const getLesson = (lessonId) => (store) => {
  if (store.lessons && store.lessons[lessonId]) return store.lessons[lessonId];
  return null;
};

// THUNK ACTION CREATORS
export const fetchLessons = () => async (dispatch) => {
  const res = await fetch(`/api/lessons`);
  if (res.ok) {
    const lessons = await res.json();
    dispatch(receiveLessons(lessons));
  }
  return Promise.resolve();
};

export const fetchLesson = (lessonId) => async (dispatch) => {
  const res = await fetch(`/api/lessons/${lessonId}`);
  if (res.ok) {
    const lesson = await res.json();
    dispatch(receiveLesson(lesson));
  }
  return Promise.resolve();
};

export const createLesson = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/lessons`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const lesson = await res.json();
    dispatch(receiveLesson(lesson));
  }
};

export const updateLesson = (lesson) => async (dispatch) => {
  const res = await csrfFetch(`/api/lessons/${lesson.id}`, {
    method: "PATCH",
    body: JSON.stringify(lesson),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const newLesson = await res.json();
    dispatch(receiveLesson(newLesson));
  }
};

export const deleteLesson = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/lessons/${id}`, {
    method: "DELETE"
  });
  // USE ARGUMENT ID, SINCE RES DOESNT RETURN ANYTHING!
  if (res.ok) {
    dispatch(removeLesson(id));
  }
};

const lessonsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_LESSONS:
      return { ...newState, ...action.lessons };
    case RECEIVE_LESSON:
      return { ...newState, [action.lesson.id]: action.lesson };
    case REMOVE_LESSON:
      delete newState[action.lessonId];
      return newState;
    default:
      return state;
  }
};

export default lessonsReducer;

