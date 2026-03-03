import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // ✅ PUBLIC signals (important: NOT private)
  number1 = signal(0);
  number2 = signal(0);
  operator = signal<'+' | '-'>('+');
  correctResult = signal(0);
  options = signal<number[]>([]);
  message = signal<string | null>(null);
  score = signal(0);

  constructor() {
    this.generateQuestion();
  }

  private randomNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  private randomOperator(): '+' | '-' {
    return Math.random() > 0.5 ? '+' : '-';
  }

  generateQuestion(): void {
    let n1 = this.randomNumber();
    let n2 = this.randomNumber();
    let op = this.randomOperator();

    // Prevent negative results
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
  }

  checkAnswer(value: number): void {
    if (value === this.correctResult()) {
      this.message.set('✅ Correct!');
      this.score.update(s => s + 1);
    } else {
      this.message.set('❌ Wrong!');
      this.score.update(s => s - 1);
    }

    setTimeout(() => {
      this.generateQuestion();
    }, 1000);
  }

  resetScore(): void {
    this.score.set(0);
  }

  private shuffle(arr: number[]): number[] {
    return arr.sort(() => Math.random() - 0.5);
  }
}