import { combineReducers } from 'redux'
import { appReducer } from './slices/app'

import { userReducer } from './slices/user'

const rootReducer = combineReducers({
  appReducer,
  userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export { rootReducer }
