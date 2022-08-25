import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './post';
import commentsReducer from './comment';
import session from './session';
import profile from './profile';
import likes from './likes'
import follows from './follows'

const rootReducer = combineReducers({
  session,
  profile,
  posts: postsReducer,
  comments: commentsReducer,
  likes,
  follows
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
