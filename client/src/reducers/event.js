import _ from 'lodash';

import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AUTH_USER_START,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  LOGOUT,
  ADD_EVENT_START,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL
} from '../actions/actionTypes';

const initialState = {
  events: [],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
    case AUTH_USER_START:
    case ADD_EVENT_START:
    case DELETE_EVENT_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOGIN_USER_SUCCESS:
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        loading: false
      };

    case LOGIN_USER_FAIL:
    case AUTH_USER_FAIL:
    case ADD_EVENT_FAIL:
    case DELETE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };

    case LOGOUT:
      return initialState

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: _.concat(state.events, action.payload.event),
        loading: false
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: _.differenceBy(state.events, [action.payload.event], '_id'),
        loading: false
      };

    default:
      return state
  }
};

export default reducer;
