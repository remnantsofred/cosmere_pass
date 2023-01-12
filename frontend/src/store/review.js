import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

export const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews,
});

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

export const getReviews = (store) => {
  if (store.reviews) return Object.values(store.reviews);
  return [];
};

export const getReviewsForLocation = (locationId) => (store) => {
  if (store.reviews) {
    const reviews = Object.values(store.reviews).filter(review => review.locationId.toString() === locationId);
    return reviews;
  }
  return [];
};


export const getReview = (reviewId) => (store) => {
  if (store.reviews && store.reviews[reviewId]) return store.reviews[reviewId];
  return null;
};

// THUNK ACTION CREATORS
export const fetchReviews = (locationId) => async (dispatch) => {
  const res = await fetch(`/api/locations/${locationId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(receiveReviews(reviews));
  }
  return Promise.resolve();
};




export const fetchReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`);
  if (res.ok) {
    const review = await res.json();
    dispatch(receiveReview(review));
  }
  return Promise.resolve();
};

export const createReview = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const review = await res.json();
    dispatch(receiveReview(review));
  }
};

export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.review_id}`, {
    method: "PATCH",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const newReview = await res.json();
    console.log("newReview", newReview)
    
    dispatch(receiveReview(newReview));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeReview(reviewId));
  }
};

// REDUCER
const reviewsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...newState, ...action.reviews };
    case RECEIVE_REVIEW:
      return { ...newState, [action.review.id]: action.review };
    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;