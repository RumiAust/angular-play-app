import { Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { mTodo } from '../model/todo.type';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoDirective } from '../directives/todo-directive/todo.directive';
import { FormsModule } from '@angular/forms';
import { FilterTodoPipe } from '../pipes/filter.todo-pipe';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoDirective, FormsModule],
  providers: [PaginationService],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit {
  todoService = inject(TodoService);
  pagination = inject(PaginationService<mTodo>);
  @ViewChild('listBox') listBox!: ElementRef<HTMLDivElement>;
  todo$ = this.todoService.getTodos();
  todoItemsApi = toSignal(this.todoService.getTodos(), { initialValue: [] });
  searchTerm = signal('');
  pageSize = 10;
  currentPage = signal(1);
  // Filtered todos signal
  filteredTodos = signal<Array<mTodo>>([]);
  constructor() {
    this.pagination.setPageSize(this.pageSize);
    // Reactively filter whenever todos or search term changes
    effect(() => {
      const term = this.searchTerm().toLowerCase();
      const todos = this.todoItemsApi();
      const filtered = todos.filter(todo =>
        todo.title.toLowerCase().includes(term)
      );
      this.pagination.setItems(filtered);
    });
  }
// Scroll only the list-box to top
private scrollListBoxToTop() {
  if (this.listBox?.nativeElement) {
      this.listBox.nativeElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
}
  onPageSizeChange(value: string) {
  const size = parseInt(value, 10);
  if (!isNaN(size) && size > 0) {
    this.pagination.setPageSize(size);
    this.scrollListBoxToTop();
  }
}
  // Smooth scroll to top of page when changing pages
  nextPage() {
    this.pagination.nextPage();
    this.scrollListBoxToTop();
  }

  prevPage() {
    this.pagination.prevPage();
    this.scrollListBoxToTop();
  }



  ngOnInit(): void {
    this.todo$.subscribe(todos => {
      console.log('Observable todos:', todos);
    });
  }



}
