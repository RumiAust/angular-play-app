import { Pipe, PipeTransform } from '@angular/core';
import { mTodo } from '../model/todo.type';


@Pipe({
  name: 'filterTodo',
})
export class FilterTodoPipe implements PipeTransform {

  transform(todo: mTodo[], searchTerm:string): mTodo[] {
    if (!todo) return [];
    if (!searchTerm) {
      return todo;
    }
    return todo.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
