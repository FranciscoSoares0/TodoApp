import { createAction, props } from "@ngrx/store";
import { Todo } from "../../interfaces/todo";

// Add Todo
export const addTodo = createAction('[Todo] Add Todo', props<{ title: string }>());
export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo }>());
export const addTodoFailure = createAction('[Todo] Add Todo Failure', props<{ error: string }>());

// Update Todo title
export const updateTodoTitle = createAction('[Todo] Update Todo Title', props<{ id: string, title: string }>());
export const updateTodoTitleSuccess = createAction('[Todo] Update Todo Title Success', props<{ id: string, title: string }>());
export const updateTodoTitleFailure = createAction('[Todo] Update Todo Title Failure', props<{ error: string }>());

// Check/Uncheck Todo
export const checkUncheckTodo = createAction('[Todo] Check/Uncheck Todo', props<{ id: string}>());
export const checkUncheckTodoSuccess = createAction('[Todo] Check/Uncheck Todo Success', props<{ id: string }>());
export const checkUncheckTodoFailure = createAction('[Todo] Check/Uncheck Todo Failure', props<{ error: string }>());

// Check/Uncheck All Todo
export const checkUncheckAllTodos = createAction('[Todo] Check/Uncheck All Todo', props<{ check: boolean}>());
export const checkUncheckAllTodoSuccess = createAction('[Todo] Check/Uncheck All Todo Success',props<{ check: boolean}>());
export const checkUncheckAllTodoFailure = createAction('[Todo] Check/Uncheck All Todo Failure', props<{ error: string }>());

// Clear Completed Todos
export const clearAllCompletedTodos = createAction('[Todo] Clear Completed Todos');
export const clearAllCompletedTodosSuccess = createAction('[Todo] Clear Completed Todos Success');
export const clearAllCompletedTodosFailure = createAction('[Todo] Clear Completed Todos Failure', props<{ error: string }>());

// Remove Todo
export const removeTodo = createAction('[Todo] Remove Todo', props<{ id: string }>());
export const removeTodoSuccess = createAction('[Todo] Remove Todo Success', props<{ id: string }>());
export const removeTodoFailure = createAction('[Todo] Remove Todo Failure', props<{ error: string }>());

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
    '[Todo] Todo Load Success',
    props<{todos: Todo[]}>()
);
export const loadTodosFailure = createAction(
    '[Todo] Todo Load Failure',
    props<{error: string}>()
);