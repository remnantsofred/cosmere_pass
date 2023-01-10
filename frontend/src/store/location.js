import csrfFetch from "./csrf";

export const RECEIVE_LOCATIONS = "locations/RECEIVE_LOCATIONS";
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
  return Promise.resolve();
};

export const createLocation = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/locations`, {
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
  const res = await csrfFetch(`/api/locations/${location.id}`, {
    method: "PATCH",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const newLocation = await res.json();
    dispatch(receiveLocation(newLocation));
  }
};

export const deleteLocation = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/locations/${id}`, {
    method: "DELETE"
  });
  // USE ARGUMENT ID, SINCE RES DOESNT RETURN ANYTHING!
  if (res.ok) {
    dispatch(removeLocation(id));
  }
};

const locationsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_LOCATIONS:
      return { ...newState, ...action.locations };
    case RECEIVE_LOCATION:
      return { ...newState, [action.location.id]: action.location };
    case REMOVE_LOCATION:
      delete newState[action.locationId];
      return newState;
    default:
      return state;
  }
};

export default locationsReducer;

