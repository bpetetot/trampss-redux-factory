import { combineReducers } from 'redux'
import { keyValue } from 'trampss-redux-factory'

export const todos = keyValue({ key: 'id', name: 'todos' })

export default combineReducers({
  todos,
})
