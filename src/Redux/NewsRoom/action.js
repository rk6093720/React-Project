import * as types from './actionTypes'
import axios from 'axios'
const getNEWSROOMjsl = () => async (dispatch) => {
  dispatch({ type: types.NEWSROOM_REQUEST })
  return await axios
    .get('http://127.0.0.1:8000/app/newsroom/')
    .then((r) => {
      console.log(r, 'newsroom')
      return dispatch({ type: types.NEWSROOM_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.NEWSROOM_FAILURE, payload: e })
    })
}
const deleteNEWSROOMjsl = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_NEWSROOM_REQUEST })
  return await axios
    .delete(`http://127.0.0.1:8000/app/newsroom/${id}`)
    .then((r) => {
      console.log(r)
      return dispatch({ type: types.DELETE_NEWSROOM_SUCCESS, payload: id })
    })
    .catch((e) => {
      return dispatch({ type: types.DELETE_NEWSROOM_FAILURE, payload: e })
    })
}
const postNEWSROOM = (payload) => async (dispatch) => {
  dispatch({ type: types.POST_NEWSROOM_REQUEST })
  const formData = new FormData()
  formData.append('Image', payload.Image) // Assuming payload.image is the file object
  formData.append('Title', payload.Title)
  formData.append('Content', payload.Content)
  try {
    const response = await axios.post(`http://127.0.0.1:8000/app/newsroom/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    dispatch({
      type: types.POST_NEWSROOM_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({ type: types.POST_NEWSROOM_FAILURE, payload: error })
  }
}

const editNEWSROOM = (id, payload) => async (dispatch) => {
  dispatch({ type: types.EDIT_NEWSROOM_REQUEST })

  const formData = new FormData()
  formData.append('Image', payload.Image) // Assuming payload.image is the file object
  formData.append('Title', payload.Title)
  formData.append('Content', payload.Content)
  return await axios
    .put(`http://127.0.0.1:8000/app/newsroom/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response)
      dispatch({
        type: types.EDIT_NEWSROOM_SUCCESS,
        payload: response.data,
      })
    })
    .catch((error) => {
      dispatch({ type: types.EDIT_NEWSROOM_FAILURE, payload: error })
    })
}

export { getNEWSROOMjsl, deleteNEWSROOMjsl, editNEWSROOM, postNEWSROOM }
