import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [ReduxThunk]
const enhancer = [applyMiddleware(...middlewares)]

function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, ...enhancer)
}

export default configureStore
