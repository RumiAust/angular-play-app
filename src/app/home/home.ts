import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Greeting],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  homeMessageToGreeting = signal('');
  introduction = signal('Hi, I am Golam Muktadir, I have created this angular app simply to play with different angular featues! My other works can be found below');
  keyMessage = signal('');
  keyHandler(event: KeyboardEvent) {
    console.log('Key pressed: ', event.key);
    this.keyMessage.set(`Key pressed: ${event.key}`);
  }

}
