import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Greeting,Counter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  homeMessageToGreeting = signal('Hi, I am from Greeting Component!');
  keyMessage = signal('');
  keyHandler(event: KeyboardEvent) {
    console.log('Key pressed: ', event.key);
    this.keyMessage.set(`Key pressed: ${event.key}`);
  }

}
