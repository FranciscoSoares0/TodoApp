import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../interfaces/todo';
import {
  addTodo,
  addTodoFailure,
  addTodoSuccess,
  checkUncheckAllTodos,
  checkUncheckAllTodoSuccess,
  checkUncheckTodo,
  checkUncheckTodoFailure,
  checkUncheckTodoSuccess,
  clearAllCompletedTodosFailure,
  clearAllCompletedTodos,
  clearAllCompletedTodosSuccess,
  loadTodos,
  loadTodosFailure,
  loadTodosSuccess,
  removeTodo,
  removeTodoFailure,
  removeTodoSuccess,
  updateTodoTitle,
  updateTodoTitleFailure,
  updateTodoTitleSuccess,
} from './todo.actions';

export interface TodoState {
  todos: Todo[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: 'pending',
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state) => ({ ...state, status: 'pending' as const })),
  on(addTodoSuccess, (state, { todo }) => ({
    ...state,
    status: 'success' as const,
    todos: [...state.todos, todo],
  })),
  on(addTodoFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(updateTodoTitle, (state) => ({ ...state, status: 'pending' as const })),
  on(updateTodoTitleSuccess, (state, { id, title }) => ({
    ...state,
    status: 'success' as const,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    ),
  })),
  on(updateTodoTitleFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(checkUncheckTodo, (state) => ({ ...state, status: 'pending' as const })),
  on(checkUncheckTodoSuccess, (state, { id }) => ({
    ...state,
    status: 'success' as const,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, checked : !todo.checked } : todo
    ),
  })),
  on(checkUncheckTodoFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(checkUncheckAllTodos, (state) => ({ ...state, status: 'pending' as const })),
  on(checkUncheckAllTodoSuccess, (state, { check }) => ({
    ...state,
    status: 'success' as const,
    todos: state.todos.map(todo => ({ ...todo, checked: check })),
  })),
  on(checkUncheckTodoFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(clearAllCompletedTodos, (state) => ({ ...state, status: 'pending' as const })),
  on(clearAllCompletedTodosSuccess, (state) => ({
    ...state,
    status: 'success' as const,
    todos: state.todos.filter((todo) => !todo.checked),
  })),
  on(clearAllCompletedTodosFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(removeTodo, (state) => ({ ...state, status: 'pending' as const })),
  on(removeTodoSuccess, (state, { id }) => ({
    ...state,
    status: 'success' as const,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  on(removeTodoFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(loadTodos, (state) => ({ ...state, status: 'loading' as const })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    error: null,
    status: 'success' as const,
  })),
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  }))
);
