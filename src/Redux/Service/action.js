import * as types from './actionTypes'
import axios from 'axios'
const getSERVICEjsl = () => async (dispatch) => {
  dispatch({ type: types.SERVICE_REQUEST })
  return await axios
    .get('http://127.0.0.1:8000/app/services/')
    .then((r) => {
      console.log(r);
      return dispatch({ type: types.SERVICE_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.SERVICE_FAILURE, payload: e })
    })
}
const deleteSERVICEjsl = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_SERVICE_REQUEST })
  return await axios
    .delete(`http://127.0.0.1:8000/app/services/${id}`)
    .then((r) => {
      console.log(r)
      return dispatch({ type: types.DELETE_SERVICE_SUCCESS, payload: id })
    })
    .catch((e) => {
      return dispatch({ type: types.DELETE_SERVICE_FAILURE, payload: e })
    })
}
const postSERVICE = (payload) => async (dispatch) => {
  dispatch({ type: types.POST_SERVICE_REQUEST })
  const { Image, Title, Content } = payload
  const formData = new FormData()
  formData.append('Image', Image) // Assuming payload.image is the file object
  formData.append('Title', Title)
  formData.append('Content', Content)
  return await axios
    .post(`http://127.0.0.1:8000/app/services/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return dispatch({
        type: types.POST_SERVICE_SUCCESS,
        payload: response.data,
      })
    })
    .catch((error) => {
      return dispatch({ type: types.POST_SERVICE_FAILURE, payload: error })
    })
}

const editSERVICE = (id, payload) => async (dispatch) => {
  dispatch({ type: types.EDIT_SERVICE_REQUEST })
  const formData = new FormData()
  formData.append('Image', payload.Image) // Assuming payload.image is the file object
  formData.append('Title', payload.Title)
  formData.append('Content', payload.Content)
  return await axios
    .put(`http://127.0.0.1:8000/app/services/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response)
      dispatch({
        type: types.EDIT_SERVICE_SUCCESS,
        payload: response.data,
      })
    })
    .catch((error) => {
      dispatch({ type: types.EDIT_SERVICE_FAILURE, payload: error })
    })
}

export { getSERVICEjsl, deleteSERVICEjsl, editSERVICE, postSERVICE }
