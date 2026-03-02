import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTodoHighlight]',
  standalone: true
})
export class TodoDirective {

  @HostBinding('style.color') color = 'black';
  @HostBinding('style.textDecoration') decoration = 'none';

  @Input() set appTodoHighlight(value: boolean) {
    if (value) {
      this.color = 'gray';
      this.decoration = 'line-through';
    } else {
      this.color = 'black';
      this.decoration = 'none';
    }
  }
}