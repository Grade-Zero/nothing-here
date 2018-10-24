import { combineReducers } from 'redux'
import sub from './sub/reducer'

let reducers = {
    sub
}

// This provides typings for the state
export type RootState = {
  [P in keyof typeof reducers]: ReturnType<typeof reducers[P]>
}

export default combineReducers(reducers)
