import { 
    SHOW_ADD_EVENT_DIALOG, 
    HIDE_ADD_EVENT_DIALOG,
    SHOW_DELETE_EVENT_DIALOG,
    HIDE_DELETE_EVENT_DIALOG 
} from './actionTypes';

export const showAddEventDialog = () => ({
  type: SHOW_ADD_EVENT_DIALOG
});

export const hideAddEventDialog = () => ({
  type: HIDE_ADD_EVENT_DIALOG
});

export const showDeleteEventDialog = () => ({
  type: SHOW_DELETE_EVENT_DIALOG
});

export const showRemoveEventDialog = payload => ({
  type: SHOW_DELETE_EVENT_DIALOG,
  payload
});

export const hideDeleteEventDialog = () => ({
  type: HIDE_DELETE_EVENT_DIALOG
});