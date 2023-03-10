import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import lessonsReducer from "./lesson";
import locationsReducer from "./location";
import lessonDatesReducer from "./lessonDates";
import reservationsReducer from "./reservation";
import reviewsReducer from "./review";


const rootReducer = combineReducers({
  session: sessionReducer,
  lessons: lessonsReducer,
  locations: locationsReducer,
  lessonDates: lessonDatesReducer,
  reservations: reservationsReducer,
  reviews: reviewsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
