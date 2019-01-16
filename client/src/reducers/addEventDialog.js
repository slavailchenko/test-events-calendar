import { SHOW_ADD_EVENT_DIALOG, HIDE_ADD_EVENT_DIALOG } from '../actions/actionTypes';

const initialState = {
  isShown: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_EVENT_DIALOG:
      return {
        isShown: true
      }
    case HIDE_ADD_EVENT_DIALOG:
      return {
        isShown: false
      }
    default:
      return state
  }
};

export default reducer;