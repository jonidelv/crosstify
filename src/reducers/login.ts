import { ActionTypes } from '../constants/actionTypes'
import { LoginActions } from '../actions/login'

interface LoginState {
  loggedIn: boolean
  errorDescription: string
}

const initialState = {
  loggedIn: false,
  errorDescription: '',
}

function assertNever(shouldBe: never): void {
  return undefined
}

export default function login(state: LoginState = initialState, action: LoginActions) {
  switch (action.type) {
    case ActionTypes.SAVE_ERROR_DESCRIPTION:
      return {
        ...state,
        errorDescription: action.payload,
      }

    case ActionTypes.MAKE_LOGIN:
      return {
        ...state,
        errorDescription: '',
        loggedIn: true,
      }

    case ActionTypes.MAKE_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        errorDescription: '',
      }

    default:
      // this will error if one of the "cases" of LoginActions isn't handled
      assertNever(action)
      return state
  }
}
