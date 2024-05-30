import * as types from './actionTypes'
import axios from 'axios';
const LoginUser = (payload) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST })
  return await axios
    .post('http://127.0.0.1:8000/app/login/', payload)
    .then((r) => {
      console.log(r)
      return dispatch({ type: types.LOGIN_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.LOGIN_FAILURE, payload: e })
    })
}
const RegisterUser = (payload) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST })
  return await axios
    .post('http://127.0.0.1:8000/app/register/', payload)
    .then((res) => {
      return dispatch({ type: types.REGISTER_SUCCESS, payload: res.data })
    })
    .catch((e) => {
      return dispatch({ type: types.REGISTER_FAILURE, payload: e })
    })
}
const ProfileFetch = (token) => async (dispatch) => {
  dispatch({ type: types.PROFILE_REQUEST })
  return await axios
    .get(`http://127.0.0.1:8000/app/profile/`,token)
    .then((r) => {
      return dispatch({ type: types.PROFILE_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.PROFILE_FAILURE, payload: e })
    })
}
const ChangepasswordFetch = (token) => async (dispatch) => {
  dispatch({ type: types.CHANGE_PASSWORD_REQUEST })
  return await axios
    .get(`http://127.0.0.1:8000/app/change-password/`, token)
    .then((r) => {
      return dispatch({ type: types.CHANGE_PASSWORD_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.CHANGE_PASSWORD_FAILURE, payload: e })
    })
}

const ChangeMailFetch = (token) => async (dispatch) => {
  dispatch({ type: types.CHANGE_MAIL_REQUEST })
  return await axios
    .get(`http://127.0.0.1:8000/app/change-email/`, token)
    .then((r) => {
      return dispatch({ type: types.CHANGE_MAIL_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.CHANGE_MAIL_FAILURE, payload: e })
    })
}
// const socialLogin = () => (dispatch) => {};
const UpdateProfileFetch =(payload,token) => async(dispatch) =>{
   dispatch({type:types.EDIT_PROFILE_REQUEST})
   console.log(payload);
   const formData = new FormData()
   formData.append("image", payload.image);
   formData.append("full_name",payload.full_name);
   formData.append("phone_number",payload.phone_number);
   return await axios
     .put(`http://127.0.0.1:8000/app/profile/`, formData,token)
     .then((r) => {
       return dispatch({ type: types.EDIT_PROFILE_SUCCESS, payload: r.data })
     })
     .catch((e) => {
       return dispatch({ type: types.EDIT_PROFILE_FAILURE, payload: e })
     })
}
const UpdateChangeMailFetch = (payload,token) => async (dispatch) => {
  dispatch({ type: types.EDIT_CHANGE_MAIL_REQUEST })
  return await axios
    .put(`http://127.0.0.1:8000/app/change-email/`, payload,token)
    .then((r) => {
      return dispatch({ type: types.EDIT_CHANGE_MAIL_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.EDIT_CHANGE_MAIL_FAILURE, payload: e })
    })
}

const UpdateChangePasswordFetch = (payload, token) => async (dispatch) => {
  dispatch({ type: types.EDIT_CHANGE_PASSWORD_REQUEST })
  return await axios
    .put(`http://127.0.0.1:8000/app/change-password/`, payload, token)
    .then((r) => {
      return dispatch({ type: types.EDIT_CHANGE_PASSWORD_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.EDIT_CHANGE_PASSWORD_FAILURE, payload: e })
    })
}
export const setAuthStatus = (status) => ({
  type: types.SET_AUTH_STATUS,
  payload: status,
})



export {
  LoginUser,
  RegisterUser,
  //socialLogin
  ProfileFetch,
  ChangeMailFetch,
  UpdateProfileFetch,
  UpdateChangeMailFetch,
  UpdateChangePasswordFetch,
  ChangepasswordFetch,
}


