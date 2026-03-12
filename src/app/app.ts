import { Component, signal } from '@angular/core';
import { Home } from './home/home';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [ Header, RouterOutlet],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Rumi');
  
}
