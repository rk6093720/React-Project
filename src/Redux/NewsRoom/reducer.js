import * as types from './actionTypes'
const nameInitialState = {
  newsroom: [],
  isLoading: false,
  isError: false,
}
const reducer = (state = nameInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.NEWSROOM_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.NEWSROOM_SUCCESS:
      return {
        ...state,
        newsroom: payload,
        isLoading: false,
        isError: false,
      }
    case types.NEWSROOM_FAILURE:
      return {
        ...state,
        isError: true,
      }
    //POST
    case types.POST_NEWSROOM_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.POST_NEWSROOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newsroom: [...state.newsroom, payload],
        isError: false,
      }
    case types.POST_NEWSROOM_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    //EDIT
    case types.EDIT_NEWSROOM_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.EDIT_NEWSROOM_SUCCESS:
      return {
        ...state,
        newsroom: state.newsroom.map((item) => (item.id === payload.id ? payload : item)),
        isLoading: false,
        isError: false,
      }
    case types.EDIT_NEWSROOM_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    //DELETE
    case types.DELETE_NEWSROOM_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.DELETE_NEWSROOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newsroom: state.newsroom.filter((item) => item.id !== payload),
        isError: false,
      }
    case types.DELETE_NEWSROOM_FAILURE:
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
