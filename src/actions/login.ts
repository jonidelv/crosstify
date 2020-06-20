import { ActionTypes } from '../constants/actionTypes'

interface ErrorAction {
  type: ActionTypes.SAVE_ERROR_DESCRIPTION
  payload: string
}

interface LoginAction {
  type: ActionTypes.MAKE_LOGIN | ActionTypes.MAKE_LOGOUT
}

export type LoginActions = ErrorAction | LoginAction

export const saveErrorDescription = (payload: string): ErrorAction => ({
  type: ActionTypes.SAVE_ERROR_DESCRIPTION,
  payload,
})

export const makeLogin = (): LoginAction => ({ type: ActionTypes.MAKE_LOGIN })
export const makeLogout = (): LoginAction => ({ type: ActionTypes.MAKE_LOGOUT })
