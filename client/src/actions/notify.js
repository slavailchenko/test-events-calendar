import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actionTypes';

export const showNotify = payload => ({
  type: SHOW_NOTIFICATION,
  payload
});

export const hideNotify = () => ({
  type: HIDE_NOTIFICATION
});
