import { createSelector } from "@ngrx/store";
import { TodoState } from "./todo.reducer";
import { AppState } from "../app.state";

export const selectTodos = (state: AppState) => state.todos;

export const selectAllTodos = createSelector(
    selectTodos,
    (state: TodoState) => state.todos
)

export const isLoadingSelector = createSelector(
    selectTodos,
    (state) => state.status === 'loading'
);

export const errorSelector = createSelector(
    selectTodos,
    (state) => state.status === 'error' ? state.error : null
);