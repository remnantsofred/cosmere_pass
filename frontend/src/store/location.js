export const RECEIVE_LOCATIONS = "location/RECEIVE_LOCATIONS";
export const RECEIVE_LOCATION = "locations/RECEIVE_LOCATION";
export const REMOVE_LOCATION = "locations/REMOVE_LOCATION";

export const receiveLocations = (locations) => ({
  type: RECEIVE_LOCATIONS,
  locations,
});

export const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location,
});

export const removeLocation = (locationId) => ({
  type: REMOVE_LOCATION,
  locationId,
});


export const getLocations = (store) => {
  if (store.locations) return Object.values(store.locations);
  return [];
};

export const getLocation = (locationId) => (store) => {
  if (store.locations && store.locations[locationId]) return store.locations[locationId];
  return null;
};

// THUNK ACTION CREATORS
export const fetchLocations = () => async (dispatch) => {
  const res = await fetch(`/api/locations`);
  if (res.ok) {
    const locations = await res.json();
    dispatch(receiveLocations(locations));
  }
};

export const fetchLocation = (locationId) => async (dispatch) => {
  const res = await fetch(`/api/locations/${locationId}`);
  if (res.ok) {
    const location = await res.json();
    dispatch(receiveLocation(location));
  }
};

export const createLocation = (data) => async (dispatch) => {
  const res = await fetch(`/api/locations`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const location = await res.json();
    dispatch(receiveLocation(location));
  }
};

export const updateLocation = (location) => async (dispatch) => {
  const res = await fetch(`/api/locations/${location.id}`, {
    method: "PATCH",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const newLesson = await res.json();
    dispatch(receiveLesson(newLocation));
  }
};

export const deleteLesson = (id) => async (dispatch) => {
  const res = await fetch(`/api/locations/${id}`, {
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
      return { ...newState, ...action.locations };
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

