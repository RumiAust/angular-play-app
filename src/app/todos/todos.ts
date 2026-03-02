import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { mTodo } from '../model/todo.type';
import { CommonModule } from '@angular/common';
 import { toSignal } from '@angular/core/rxjs-interop';
import { TodoDirective } from '../directives/todo-directive/todo.directive';
import { FormsModule } from '@angular/forms';
import { FilterTodoPipe } from '../pipes/filter.todo-pipe';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoDirective,FormsModule,FilterTodoPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit {
  todoItems = signal<Array<mTodo>>([]);
  todoService = inject(TodoService);
  todo$ = this.todoService.getTodos();
  todoItemsApi = toSignal(this.todoService.getTodos(), { initialValue: [] });
  searchTerm = signal('');
  

 ngOnInit(): void {
    this.todo$.subscribe(todos => {
    console.log('Observable todos:', todos);
  });
  }
   
}
