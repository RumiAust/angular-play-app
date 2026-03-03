import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { MathGame } from '../math-game/math-game';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Greeting, MathGame],
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
