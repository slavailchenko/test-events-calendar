import axios from 'axios';

import { showNotify } from './notify';

import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AUTH_USER_START,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  LOGOUT
} from './actionTypes';

export const loginUserStart = () => ({
  type: LOGIN_USER_START
});

export const loginUserSuccess = payload => ({
  type: LOGIN_USER_SUCCESS,
  payload
});

export const loginUserFail = payload => ({
  type: LOGIN_USER_FAIL,
  payload
});

export const googleLogin = idToken => dispatch => {
  dispatch(loginUserStart())
  axios
    .post('/api/v1/users/google', { idToken })
    .then(res => {
      console.log("google");
      console.log(res.data);
      dispatch(loginUserSuccess(res.data));
      dispatch(showNotify({ 
        message: `Hello, ${res.data.user.name}!)`, 
        type: 'success' })
      )
    })
    .catch(err => {
      let error = err.response && err.response.data ? err.response.data : err
      dispatch(loginUserFail(error))
      dispatch(showNotify({ 
        message: error.message, 
        type: 'danger' })
      )
    })
};

export const authUserStart = () => ({
  type: AUTH_USER_START
});

export const authUserSuccess = payload => ({
  type: AUTH_USER_SUCCESS,
  payload
});

export const authUserFail = payload => ({
  type: AUTH_USER_FAIL,
  payload
});

export const authorize = authToken => dispatch => {
  const authToken = localStorage.getItem('AUTH_TOKEN');

  if (!authToken) return;

  dispatch(authUserStart())
  axios({
    method: 'get',
    url: '/api/v1/users/me',
    headers: { Authorization: authToken }
  })
    .then(res => {
      console.log('me');
      console.log(res.data);
      dispatch(authUserSuccess(res.data))
      dispatch(showNotify({ 
        message: `Hello, ${res.data.user.name}!)`, 
        type: 'success' 
      }))
    })
    .catch(err => {
      let error = err.response && err.response.data ? err.response.data : err
      dispatch(authUserFail(error))
      dispatch(showNotify({ 
        message: 'Authorization error', 
        type: 'danger' })
      )
    })
};

export const logout = () => ({
  type: LOGOUT
});
