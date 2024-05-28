import * as types from './actionTypes'
import axios from 'axios'
const LoginUser = (payload) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST })
  return await axios
    .post('http://127.0.0.1:8000/app/login/', payload)
    .then((r) => {
      console.log(r.data)
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
// const socialLogin = () => (dispatch) => {};

export const setAuthStatus = (status) => ({
  type: types.SET_AUTH_STATUS,
  payload: status,
})

export {
  LoginUser,
  RegisterUser,
  //socialLogin
}
