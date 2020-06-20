import { combineReducers } from 'redux'
import login from './login'
import create from './create'

const rootReducer = combineReducers({ login, create })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
