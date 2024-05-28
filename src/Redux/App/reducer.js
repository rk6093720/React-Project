import * as types from './actionTypes'
const nameInitialState = {
  discover: [],
  isLoading: false,
  isError: false,
}
const reducer = (state = nameInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.DISCOVER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.DISCOVER_SUCCESS:
      return {
        ...state,
        discover: payload,
        isLoading: false,
        isError: false,
      }
    case types.DISCOVER_FAILURE:
      return {
        ...state,
        isError: true,
      }
    //POST
    case types.POST_DISCOVER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.POST_DISCOVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        discover: [...state.discover, payload],
        isError: false,
      }
    case types.POST_DISCOVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    //EDIT
    case types.EDIT_DISCOVER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.EDIT_DISCOVER_SUCCESS:
      return {
        ...state,
        discover: state.discover.map((item) => (item.id === payload.id ? payload : item)),
        isLoading: false,
        isError: false,
      }
    case types.EDIT_DISCOVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    //DELETE
    case types.DELETE_DISOCOVER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.DELETE_DISOCOVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        discover: state.discover.filter((item) => item.id !== payload),
        isError: false,
      }
    case types.DELETE_DISOCOVER_FAILURE:
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
