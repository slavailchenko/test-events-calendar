import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AUTH_USER_START,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  user: null,
  loginLoading: false,
  authLoading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case LOGIN_USER_START:
      return {
        ...state,
        loginLoading: true,
        error: null
      }
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('AUTH_TOKEN', action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        loginLoading: false
      }
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loginLoading: false,
        error: action.payload.message
      }
    case AUTH_USER_START:
      return {
        ...state,
        authLoading: true,
        error: null
      }
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authLoading: false
      }
    case AUTH_USER_FAIL:
      if (action.payload.message !== 'Network Error') localStorage.removeItem('AUTH_TOKEN')
      return {
        ...state,
        authLoading: false,
        error: action.payload.message
      }
    case LOGOUT:
      localStorage.removeItem('AUTH_TOKEN')
      return initialState
    default:
      return state
  }

}

export default reducer;
