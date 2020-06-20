import login from '../../reducers/login'
import * as types from '../../constants/actionTypes'

const initialState = {
  loggedIn: false,
  errorDescription: '',
}

describe('login reducer', () => {

  it('should return the initial state', () => {
    expect(login(undefined, {})).toEqual(initialState)
  })

  it('should handle SAVE_ERROR_DESCRIPTION', () => {
    expect(login(initialState, {
      type: types.SAVE_ERROR_DESCRIPTION,
      payload: 'Error description',
    })).toEqual({...initialState, errorDescription: 'Error description'})
  })

  it('should handle MAKE_LOGIN', () => {
    expect(login(initialState, {
      type: types.MAKE_LOGIN,
    })).toEqual({errorDescription: '', loggedIn: true })
  })

  it('should handle MAKE_LOGOUT', () => {
    expect(login(initialState, {
      type: types.MAKE_LOGOUT,
    })).toEqual({errorDescription: '', loggedIn: false })
  })

})
