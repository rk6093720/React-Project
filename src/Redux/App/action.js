import * as types from './actionTypes'
import axios from 'axios'
const getdiscoverjsl = () => async (dispatch) => {
  dispatch({ type: types.DISCOVER_REQUEST })
  return await axios.get('http://127.0.0.1:8000/app/discoverjsl/')
    .then((r) => {
      // console.log(r, "discover");
      return dispatch({ type: types.DISCOVER_SUCCESS, payload: r.data })
    })
    .catch((e) => {
      return dispatch({ type: types.DISCOVER_FAILURE, payload: e })
    })
}
const deleteDiscoverjsl = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_DISOCOVER_REQUEST })
  return await axios
    .delete(`http://127.0.0.1:8000/app/discoverjsl/${id}`)
    .then((r) => {
      console.log(r)
      return dispatch({ type: types.DELETE_DISOCOVER_SUCCESS, payload: id })
    })
    .catch((e) => {
      return dispatch({ type: types.DELETE_DISOCOVER_FAILURE, payload: e })
    })
}
const postDiscover = (payload) => async (dispatch) => {
  dispatch({ type: types.POST_DISCOVER_REQUEST })
  const formData = new FormData()
  formData.append('Image', payload.Image) // Assuming payload.Image is the file object
  formData.append('Title', payload.Title)
  formData.append('Introduction', payload.Introduction)
  formData.append('Vision', payload.Vision)
  formData.append('Mission', payload.Mission)

  try {
    const response = await axios.post(`http://127.0.0.1:8000/app/discoverjsl/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    dispatch({
      type: types.POST_DISCOVER_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({ type: types.POST_DISCOVER_FAILURE, payload: error })
  }
}

const editDiscover = (id, payload) => async (dispatch) => {
  dispatch({ type: types.EDIT_DISCOVER_REQUEST })

  const formData = new FormData()
  formData.append('Image', payload.Image) // Assuming payload.Image is the file object
  formData.append('Title', payload.Title)
  formData.append('Introduction', payload.Introduction)
  formData.append('Vision', payload.Vision)
  formData.append('Mission', payload.Mission)

  return await axios
    .put(`http://127.0.0.1:8000/app/discoverjsl/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response)
      dispatch({
        type: types.EDIT_DISCOVER_SUCCESS,
        payload: response.data,
      })
    })
    .catch((error) => {
      dispatch({ type: types.EDIT_DISCOVER_FAILURE, payload: error })
    })
}

export { getdiscoverjsl, deleteDiscoverjsl, editDiscover, postDiscover }
