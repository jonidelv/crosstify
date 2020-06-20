import * as actions from '../../actions/login'
import * as types from '../../constants/actionTypes'

describe('login actions', () => {

  it('should create an action to handle SAVE_ERROR_DESCRIPTION', () => {
    const expectedAction = {
      type: types.SAVE_ERROR_DESCRIPTION,
      payload: 'Error',
    }
    expect(actions.saveErrorDescription('Error')).toEqual(expectedAction)
  })

  it('should create an action to handle MAKE_LOGIN', () => {
    const expectedAction = {
      type: types.MAKE_LOGIN,
    }
    expect(actions.makeLogin()).toEqual(expectedAction)
  })

  it('should create an action to handle MAKE_LOGOUT', () => {
    const expectedAction = {
      type: types.MAKE_LOGOUT,
    }
    expect(actions.makeLogout()).toEqual(expectedAction)
  })

})
