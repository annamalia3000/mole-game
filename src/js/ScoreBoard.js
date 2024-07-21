export default class ScoreBoard {
    constructor() {
        this.score = 0;
        this.missed = 0;
        this.maxMissed = 5;
        this.scoreEl = null;
        this.missedEl = null;

    }

    init() {
        this.scoreEl = document.querySelector('.score');
        this.missedEl = document.querySelector('.missed');
    }

    updateScore() {
        this.score += 1;
        this.scoreEl.textContent = `Score: ${this.score}`;
    }

    updateMissed() {
        this.missed += 1;
        this.missedEl.textContent = `Missed: ${this.missed}`;
    }

    isGameOver() {
        return this.missed >= this.maxMissed;
    }

    reset() {
        this.score = 0;
        this.missed = 0;
        this.scoreEl.textContent = `Score: ${this.score}`;
        this.missedEl.textContent = `Missed: ${this.missed}`;
    }
}
