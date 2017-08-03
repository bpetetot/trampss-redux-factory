import * as types from '../constants/ActionTypes'
import { todos } from '../reducers'

export const addTodo = text => todos.add({ text })
export const deleteTodo = id => todos.remove(id)
export const editTodo = (id, text) => todos.update({ id, text })
export const completeTodo = id => todos.update({ id, completed: true })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
