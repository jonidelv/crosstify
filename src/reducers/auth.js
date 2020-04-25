import { SAVE_ERROR_DESCRIPTION, MAKE_LOGIN, MAKE_LOGOUT } from '../constants/actionTypes'

const initialState = {
  loggedIn: false,
  errorDescription: '',
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case SAVE_ERROR_DESCRIPTION:
      return {
        ...state,
        errorDescription: action.payload,
      }

    case MAKE_LOGIN:
      return {
        ...state,
        errorDescription: '',
        loggedIn: true,
      }

    case MAKE_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        errorDescription: '',
      }

    default:
      return state
  }
}
