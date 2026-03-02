import { inject, Injectable } from '@angular/core';
import { mTodo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoItems: Array<mTodo> = [
    { id: 1, title: 'Learn Angular', completed: false, userId: 1001 },
    { id: 2, title: 'Build a Todo App', completed: false, userId: 1002 },
    { id: 3, title: 'Master Angular Signals', completed: false, userId: 1003 },
  ];
  http = inject(HttpClient);
  constructor() { }

  getTodos():Observable<mTodo[]> {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<mTodo[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching todos:', error);
        return of([]);
      })
    );
  }
}
