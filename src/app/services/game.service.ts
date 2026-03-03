import { Injectable, signal, OnDestroy } from '@angular/core';

type Difficulty = 'easy' | 'medium' | 'hard';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {

  number1 = signal(0);
  number2 = signal(0);
  operator = signal<'+' | '-'>('+');
  correctResult = signal(0);
  options = signal<number[]>([]);
  message = signal<string | null>(null);
  score = signal(0);

  difficulty = signal<Difficulty>('easy');

  timeLeft = signal(0);

  isPlaying = signal(false);
  isGameOver = signal(false);

  private timerInterval: number | null = null;

  constructor() {}

  // --------------------------
  // Difficulty → sets timer automatically
  // --------------------------
  setDifficulty(level: Difficulty) {
    this.difficulty.set(level);
  }

  private getTimeByDifficulty(): number {
    switch (this.difficulty()) {
      case 'easy': return 5;
      case 'medium': return 3;
      case 'hard': return 2;
    }
  }

  private getMaxNumber(): number {
    switch (this.difficulty()) {
      case 'easy': return 9;
      case 'medium': return 20;
      case 'hard': return 50;
    }
  }

  private randomNumber(): number {
    return Math.floor(Math.random() * this.getMaxNumber()) + 1;
  }

  private randomOperator(): '+' | '-' {
    return Math.random() > 0.5 ? '+' : '-';
  }

  // --------------------------
  // GAME CONTROL
  // --------------------------
  startGame() {
    this.score.set(0);
    this.isGameOver.set(false);
    this.isPlaying.set(true);
    this.generateQuestion();
  }

  stopGame() {
    this.stopTimer();
    this.isPlaying.set(false);
  }

  private endGame() {
    this.stopTimer();
    this.isPlaying.set(false);
    this.isGameOver.set(true);
    this.message.set('💀 Game Over!');
  }

  // --------------------------
  // TIMER
  // --------------------------
  private startTimer() {

    this.stopTimer();

    const seconds = this.getTimeByDifficulty();
    this.timeLeft.set(seconds);

    this.timerInterval = window.setInterval(() => {

      const newTime = this.timeLeft() - 1;
      this.timeLeft.set(newTime);

      if (newTime <= 0) {
        this.endGame(); // STOP game completely
      }

    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // --------------------------
  // QUESTION GENERATOR
  // --------------------------
  private generateQuestion(): void {

    if (!this.isPlaying()) return;

    let n1 = this.randomNumber();
    let n2 = this.randomNumber();
    let op = this.randomOperator();

    if (op === '-' && n2 > n1) {
      [n1, n2] = [n2, n1];
    }

    this.number1.set(n1);
    this.number2.set(n2);
    this.operator.set(op);

    const result = op === '+' ? n1 + n2 : n1 - n2;
    this.correctResult.set(result);

    let dummy1 = result + this.randomNumber();
    let dummy2 = result - this.randomNumber();

    while (dummy1 === result) {
      dummy1 = result + this.randomNumber();
    }

    while (dummy2 === result || dummy2 === dummy1 || dummy2 < 0) {
      dummy2 = result - this.randomNumber();
    }

    const allOptions = [result, dummy1, dummy2];
    this.options.set(this.shuffle(allOptions));

    this.message.set(null);

    this.startTimer();
  }

  checkAnswer(value: number): void {

    if (!this.isPlaying()) return;

    this.stopTimer();

    if (value === this.correctResult()) {
      this.score.update(s => s + 1);
      this.generateQuestion();
    } else {
      this.endGame();
    }
  }

  private shuffle(arr: number[]): number[] {
    return arr.sort(() => Math.random() - 0.5);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}