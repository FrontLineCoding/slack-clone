import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import channelReducer from './channels';
import commentsReducer from './comments';
import messagesReducer from './messages';
import session from './session';
import usersReducer from './users';
import workspaceReducer from './workspace';

const rootReducer = combineReducers({
  session,
  workspaces: workspaceReducer,
  channels: channelReducer,
  messages: messagesReducer,
  comments: commentsReducer,
  users: usersReducer,
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
