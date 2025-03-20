import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addTodo, checkUncheckAllTodos, checkUncheckTodo, clearAllCompletedTodos, loadTodos, removeTodo, updateTodoTitle } from '../state/todos/todo.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { errorSelector, isLoadingSelector, selectAllTodos } from '../state/todos/todo.selectors';
import { Todo } from '../interfaces/todo';
import { map, Observable, of } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-todo',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  
  allTodos$: Observable<Todo[]>;
  filteredTodos$: Observable<Todo[]> = of([]);
  activeTodosCount$: Observable<number>;
  completedTodosCount$: Observable<number>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  todoForm : FormGroup;
  showChecked: boolean = false;
  filter : 'all' | 'completed' | 'active' = 'all';
  checkAll : boolean = true;

  constructor(private store: Store<AppState>,private fb:FormBuilder){
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.allTodos$ = this.store.select(selectAllTodos);

    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
    });

    this.applyFilter();
    // Apply filter based on checked/unchecked status
    this.activeTodosCount$ = this.allTodos$.pipe(
      map(todos => todos.filter(todo => !todo.checked).length)
    );

    this.completedTodosCount$ = this.allTodos$.pipe(
      map(todos => todos.filter(todo => todo.checked).length)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  get fc() {
    return this.todoForm.controls;
  }

  addTodo(){
    this.store.dispatch(addTodo({title:this.todoForm.value.title}));
    this.todoForm.reset();
  }

  checkUncheckTodo(todo : Todo){
    this.store.dispatch(checkUncheckTodo({id:todo.id}));
  }

  checkUncheckAllTodos(){
    this.store.dispatch(checkUncheckAllTodos({check:this.checkAll}));
    this.checkAll = !this.checkAll;
  }

  clearAllCompletedTodos(){
    this.store.dispatch(clearAllCompletedTodos());
  }

  updateTodoTitle(todo:Todo){
    this.store.dispatch(updateTodoTitle({ id: todo.id, title: this.todoForm.value.title }));
    this.todoForm.reset();
  }

  removeTodo(todo:Todo){
    this.store.dispatch(removeTodo({id:todo.id}));
  }

  applyFilter() {
    this.filteredTodos$ = this.allTodos$.pipe(
      map(todos => {
        if (this.filter === 'active') {
          return todos.filter(todo => !todo.checked);
        } else if (this.filter === 'completed') {
          return todos.filter(todo => todo.checked);
        }
        return todos;
      })
    );
  }

  setFilter(filter: 'all' | 'completed' | 'active') {
    this.filter = filter;
    this.applyFilter();
  }
}
