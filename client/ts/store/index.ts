import { combineReducers } from 'redux'
import comic from './comic/reducer'
import sub from './sub/reducer'

let reducers = {
    comic,
    sub
}

// This provides typings for the state
export type RootState = {
  [P in keyof typeof reducers]: ReturnType<typeof reducers[P]>
}

export default combineReducers(reducers)
