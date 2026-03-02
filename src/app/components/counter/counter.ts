import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
   message = signal('Welcome to counter component');
   counter = signal(0);

   increment() {
     this.counter.update((value) => value + 1);
   } 
    decrement() {
      this.counter.update((value) => value - 1);
    }
    reset() {
      this.counter.set(0);
    }

}
