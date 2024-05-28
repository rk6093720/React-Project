import * as types from './actionTypes'
const nameInitialState = {
  service: [],
  isLoading: false,
  isError: false,
}
const reducer = (state = nameInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.SERVICE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.SERVICE_SUCCESS:
      return {
        ...state,
        service: payload,
        isLoading: false,
        isError: false,
      }
    case types.SERVICE_FAILURE:
      return {
        ...state,
        isError: true,
      }
    //POST
    case types.POST_SERVICE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.POST_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        service: [...state.service, payload],
        isError: false,
      }
    case types.POST_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    //EDIT
    case types.EDIT_SERVICE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.EDIT_SERVICE_SUCCESS:
      return {
        ...state,
        service: state.service.map((item) => (item.id === payload.id ? payload : item)),
        isLoading: false,
        isError: false,
      }
    case types.EDIT_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    //DELETE
    case types.DELETE_SERVICE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        service: state.service.filter((item) => item.id !== payload),
        isError: false,
      }
    case types.DELETE_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      return state
  }
}
export { reducer }
