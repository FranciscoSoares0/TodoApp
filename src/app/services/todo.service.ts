import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Observable, of, delay, map, from } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];

  constructor(private firestore: Firestore) {}

  // Get all todos
  getTodos(): Observable<Todo[]> {
    const todosCollectionRef = collection(this.firestore, 'todos');
    
    return from(getDocs(todosCollectionRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Todo))
    );
  }

  // Add a new todo
  addTodo(title: string): Observable<Todo> {
    const todosCollectionRef = collection(this.firestore, 'todos');
    const todoData = {
      title: title,
      checked : false,
    };
    return from(addDoc(todosCollectionRef, todoData)).pipe(
      map(docRef => ({
        id: docRef.id, // Firestore assigns an ID
        title,
        checked : false
      }))
    );
  }

  // Update a todo
  updateTodoTitle(id: string, title: string): Observable<Todo> {
    const todoDocRef = doc(this.firestore, 'todos', id);
  
    return from(getDocs(collection(this.firestore, 'todos'))).pipe(
      map(snapshot => {
        // Find the existing todo by ID
        const todo = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }) as Todo)
          .find(todo => todo.id === id);
  
        // Ensure we preserve the existing `checked` status
        const updatedTodo: Todo = {
          id,
          title,
          checked: todo ? todo.checked : false, // Use existing checked value
        };
  
        // Update Firestore document
        updateDoc(todoDocRef, { title });
  
        return updatedTodo;
      })
    );
  }

  // Check a todo
  checkUncheckTodo(id: string): Observable<Todo> {
    const todoDocRef = doc(this.firestore, 'todos', id);
  
    return from(getDocs(collection(this.firestore, 'todos'))).pipe(
      map(snapshot => {
        // Find the existing todo by ID
        const todo = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }) as Todo)
          .find(todo => todo.id === id);
  
        // Ensure we preserve the existing `checked` status
        const updatedTodo: Todo = {
          id,
          title : todo ? todo.title : '',
          checked: !todo?.checked// Use existing checked value
        };
  
        // Update Firestore document
        updateDoc(todoDocRef, { checked: updatedTodo.checked });
  
        return updatedTodo;
      })
    );
  }

  // Check/Uncheck All Todos
  checkUncheckAllTodos(check: boolean): Observable<void> {
    const todosCollectionRef = collection(this.firestore, 'todos');

    return from(
      getDocs(todosCollectionRef).then(snapshot => {
        const batch = writeBatch(this.firestore);

        snapshot.docs.forEach(docSnapshot => {
          const todoRef = doc(this.firestore, 'todos', docSnapshot.id);
          batch.update(todoRef, { checked: check });
        });

        return batch.commit(); // Commit all updates in one batch
      })
    );
  }

  // Clear all completed todos
  clearAllCompletedTodos(): Observable<void> {
    const todosCollectionRef = collection(this.firestore, 'todos');

    return from(
      getDocs(todosCollectionRef).then(snapshot => {
        const batch = writeBatch(this.firestore);

        snapshot.docs.forEach(docSnapshot => {
          const todo = docSnapshot.data();
          if (todo['checked']) {
            const todoRef = doc(this.firestore, 'todos', docSnapshot.id);
            batch.delete(todoRef);
          }
        });

        return batch.commit(); // Commit all deletions in one batch
      })
    );
  }

  // Remove a todo
  removeTodo(id: string): Observable<string> {
    const todoDocRef = doc(this.firestore, 'todos', id);

    return from(deleteDoc(todoDocRef)).pipe(
      map(() => id) // Return the deleted id
    );
  }
}
