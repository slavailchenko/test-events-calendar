import uuidv1 from 'uuid/v1';
import axios from 'axios';

import { showNotify } from './notify';
import { hideAddEventDialog, hideDeleteEventDialog } from './eventDialog';
import { store } from '../store';

import {
  ADD_EVENT_START,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL
} from './actionTypes';

export const addEventStart = () => ({
  type: ADD_EVENT_START
});

export const addEventSuccess = payload => ({
  type: ADD_EVENT_SUCCESS,
  payload
});

export const addEventFail = payload => ({
  type: ADD_EVENT_FAIL,
  payload
});

export const addEvent = payload => dispatch => {
  
  const result = event => {
    dispatch(addEventSuccess({ event: event }));
    dispatch(hideAddEventDialog());
    dispatch(showNotify({ 
      message: 'Event added', 
      type: 'success' })
    )
  };

  if (!store.getState().auth.user) {
    return result({ ...payload, _id: uuidv1()
    })
  };

  const authToken = localStorage.getItem('AUTH_TOKEN');

  dispatch(addEventStart())
  axios({
    method: 'post',
    url: '/api/v1/events',
    data: payload,
    headers: { authorization: authToken }
  })
    .then(res => result(res.data.event))
    .catch(err => {
      let error = err.response && err.response.data ? err.response.data : err;
      dispatch(addEventFail(error));
      dispatch(showNotify({ 
        message: error.message, 
        type: 'danger' })
      )
    })
};

export const deleteEventStart = () => ({
  type: DELETE_EVENT_START
});

export const deleteEventSuccess = payload => ({
  type: DELETE_EVENT_SUCCESS,
  payload
});

export const deleteEventFail = payload => ({
  type: DELETE_EVENT_FAIL,
  payload
});

export const deleteEvent = event => dispatch => {
  const onSuccess = () => {
    console.log('event');
    console.log(event);
    dispatch(deleteEventSuccess({ event: event }));
    dispatch(hideDeleteEventDialog());
    dispatch(showNotify({ 
      message: 'Event deleted', 
      type: 'success' })
    )
  };

  if (!store.getState().auth.user) {
    return onSuccess()
  };

  const authToken = localStorage.getItem('AUTH_TOKEN');

  dispatch(deleteEventStart())
  axios({
    method: 'DELETE',
    url: `api/v1/events/${event._id}`,
    headers: { Authorization: authToken }
  })
    .then(res => {
      console.log(res.data);
      onSuccess()
    })
    .catch(err => {
      let error = err.response && err.response.data ? err.response.data : err;
      dispatch(deleteEventFail(error));
      dispatch(showNotify({ 
        message: error.message, 
        type: 'danger' }))
    })
};