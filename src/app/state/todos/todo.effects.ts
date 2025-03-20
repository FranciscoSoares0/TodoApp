import { inject, Injectable } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTodo, addTodoFailure, addTodoSuccess, checkUncheckAllTodos, checkUncheckAllTodoFailure, checkUncheckAllTodoSuccess, checkUncheckTodo, checkUncheckTodoFailure, checkUncheckTodoSuccess, loadTodos, loadTodosFailure, loadTodosSuccess, removeTodo, removeTodoFailure, removeTodoSuccess, updateTodoTitle, updateTodoTitleFailure, updateTodoTitleSuccess, clearAllCompletedTodos, clearAllCompletedTodosSuccess, clearAllCompletedTodosFailure } from './todo.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions);
  todoService = inject(TodoService);

  loadTodos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        from(this.todoService.getTodos()).pipe(
          map((todos) => loadTodosSuccess({ todos: todos })),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  // Effect to add a new todo
  addTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({ title }) =>
        from(this.todoService.addTodo(title)).pipe(
          map(todo => addTodoSuccess({ todo })),
          catchError(error => of(addTodoFailure({ error })))
        )
      )
    ),
  );

  // Effect to update a todo title
  updateTodoTitle$ = createEffect(() => 
    this.actions$.pipe(
      ofType(updateTodoTitle),
      switchMap(({ id, title }) =>
        from(this.todoService.updateTodoTitle(id, title)).pipe(
          map(() => updateTodoTitleSuccess({ id, title })), 
          catchError(error => of(updateTodoTitleFailure({ error })))
        )
      )
    ),
  );

  // Effect to check/uncheck a todo
  checkUncheckTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(checkUncheckTodo),
      switchMap(({ id }) =>
        from(this.todoService.checkUncheckTodo(id)).pipe(
          map(() => checkUncheckTodoSuccess({ id })), 
          catchError(error => of(checkUncheckTodoFailure({ error })))
        )
      )
    ),
  );

  // Effect to check/uncheck all todos
  checkUncheckAllTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(checkUncheckAllTodos),
      switchMap(({ check }) =>
        from(this.todoService.checkUncheckAllTodos(check)).pipe(
          map(() => checkUncheckAllTodoSuccess({ check })), 
          catchError(error => of(checkUncheckAllTodoFailure({ error })))
        )
      )
    ),
  );

  // Effect to clear all completed todos
  clearAllCompletedTodos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(clearAllCompletedTodos),
      switchMap(() =>
        from(this.todoService.clearAllCompletedTodos()).pipe(
          map(() => clearAllCompletedTodosSuccess()), 
          catchError(error => of(clearAllCompletedTodosFailure({ error })))
        )
      )
    ),
  );

  // Effect to remove a todo
  removeTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap(({ id }) =>
        from(this.todoService.removeTodo(id)).pipe(
          map(() => removeTodoSuccess({ id })),
          catchError(error => of(removeTodoFailure({ error })))
        )
      )
    ),
  );

}
