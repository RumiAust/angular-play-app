import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-math-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './math-game.html',
  styleUrl: './math-game.css',
})
export class MathGame {
game = inject(GameService);
}
