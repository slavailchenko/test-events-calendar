import { SHOW_DELETE_EVENT_DIALOG, HIDE_DELETE_EVENT_DIALOG } from '../actions/actionTypes';

const initialState = {
  event: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DELETE_EVENT_DIALOG:
      return {
        event: action.payload
      }
    case HIDE_DELETE_EVENT_DIALOG:
      return {
        event: null
      }
    default:
      return state
  }
};

export default reducer;
