import authReducer from './auth';
import eventReducer from './event';
import notifyReducer from './notify';
import addEventDialogReducer from './addEventDialog';
import deleteEventDialogReducer from './deleteEventDialog';

export default {
  auth: authReducer,
  event: eventReducer,
  notify: notifyReducer,
  addEventDialog: addEventDialogReducer,
  deleteEventDialog: deleteEventDialogReducer
};
