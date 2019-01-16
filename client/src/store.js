import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export const history = syncHistoryWithStore(browserHistory, store);