import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, LOGOUT } from '../actions/actionTypes';

const initialState = {
  isShown: false,
  message: null,
  type: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        isShown: true,
        message: action.payload.message,
        type: action.payload.type
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        isShown: false
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
