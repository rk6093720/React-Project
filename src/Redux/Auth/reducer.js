import { appData, saveData } from '../../components/LocalStorage'
import * as types from './actionTypes'
const InitialState = {
  isLoading: false,
  isError: false,
  token: appData('auth') || '',
  isAuth: false,
  msg: '',
  status: false,
  isBlock: false,
  failedAttempt: 0,
  profileData: appData('profile') || [],
  changepassword: appData('changepassword') || [],
  changeEmail: appData('changeEmail') || [],
}
const reducer = (state = InitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
      }
    case types.LOGIN_SUCCESS:
      console.log(payload)
      let newLogin = saveData('auth', payload)
      return {
        ...state,
        token: newLogin,
        isAuth: true,
        msg: payload,
      }
    case types.SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: payload,
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
      }
    case types.REGISTER_REQUEST:
      return {
        ...state,
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        status: true,
        msg: payload,
      }
    case types.REGISTER_FAILURE:
      return {
        ...state,
        isError: true,
      }
    case types.PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case types.PROFILE_SUCCESS:
      // console.log(payload)
      return {
        ...state,
        isLoading: false,
        isError: false,
        profileData: saveData('profile', payload),
      }
    case types.PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case types.EDIT_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        profileData: state.profileData.map((item) => (item.id === payload.id ? payload : item)),
      }
    case types.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case types.CHANGE_MAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case types.CHANGE_MAIL_SUCCESS:
      // console.log(payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        changeEmail: saveData('changeEmail', payload),
      }
    case types.CHANGE_MAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case types.EDIT_CHANGE_MAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case types.EDIT_CHANGE_MAIL_SUCCESS:
      console.log(state.changeEmail.map((item) => (item.email === payload.email ? payload : item)))
      return {
        ...state,
        isLoading: false,
        isError: false,
        changeEmail: state.changeEmail.map((item) =>
          item.email === payload.email ? payload : item,
        ),
      }
    case types.EDIT_CHANGE_MAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case types.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case types.CHANGE_PASSWORD_SUCCESS:
      // console.log(payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        changepassword: saveData('changepassword', payload),
      }
    case types.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case types.EDIT_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case types.EDIT_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        changepassword: state.changepassword.map((item) =>
          item.password === payload.password ? payload : item,
        ),
      }
    case types.EDIT_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    default:
      return state
  }
}
export { reducer }
