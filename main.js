/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/GamePlay.js
class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
  }
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }
  drawUi() {
    this.checkBinding();
    this.container.innerHTML = `
        <div class="score-board">
            <div class="score">Score: 0</div>
            <div class="missed">Missed: 0</div>
        </div>
        <div class="board-container">
          <div data-id="board" class="board"></div>
        </div>
      `;
    this.boardEl = this.container.querySelector('[data-id=board]');
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      this.boardEl.appendChild(cellEl);
    }
    this.cells = [...this.boardEl.children];
  }
  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
;// CONCATENATED MODULE: ./src/js/Character.js
class Character {
  constructor() {
    this.position = null;
    this.selector = '.character';
    this.element = null;
  }
  setElement(cell) {
    this.element = cell.querySelector(this.selector);
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.classList.add('character');
      cell.appendChild(this.element);
    }
  }
  moveTo(cell) {
    this.element.remove();
    cell.appendChild(this.element);
  }
  remove() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
;// CONCATENATED MODULE: ./src/js/generateRandomPosition.js
function generateRandomPosition(boardSize) {
  return Math.floor(Math.random() * boardSize ** 2);
}
;// CONCATENATED MODULE: ./src/js/ScoreBoard.js
class ScoreBoard {
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
;// CONCATENATED MODULE: ./src/js/GameController.js



class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.boardSize = 4;
    this.character = new Character();
    this.scoreBoard = new ScoreBoard();
    this.moveInterval = null;
    this.moveIntervalTime = 1000;
    this.lastPosition = null;
    this.characterClicked = false;
  }
  init() {
    this.gamePlay.drawUi();
    this.scoreBoard.init();
    this.startGameLoop();
    this.addCellClickHandlers();
  }
  placeCharacterRandomly() {
    let position = generateRandomPosition(this.boardSize);
    if (position === this.lastPosition) {
      position = (position + 1) % this.boardSize ** 2;
    }
    this.lastPosition = position;
    const cell = this.gamePlay.cells[position];
    this.character.setElement(cell);
  }
  startGameLoop() {
    this.placeCharacterRandomly();
    this.moveInterval = setInterval(() => {
      if (!this.characterClicked) {
        this.scoreBoard.updateMissed();
        if (this.scoreBoard.isGameOver()) {
          this.endGame();
          return;
        }
      }
      this.character.remove();
      this.placeCharacterRandomly();
      this.characterClicked = false;
    }, this.moveIntervalTime);
  }
  addCellClickHandlers() {
    this.gamePlay.cells.forEach(cell => {
      cell.addEventListener('click', e => {
        if (e.target.classList.contains('character')) {
          this.scoreBoard.updateScore();
          this.character.remove();
          this.characterClicked = true;
        }
      });
    });
  }
  endGame() {
    clearInterval(this.moveInterval);
    alert(`Game Over! Your score: ${this.scoreBoard.score}`);
    this.resetGame();
  }
  resetGame() {
    this.character.remove();
    this.scoreBoard.reset();
    this.lastPosition = null;
    this.characterClicked = false;
    clearInterval(this.moveInterval);
    this.startGameLoop();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));
const gameCtrl = new GameController(gamePlay);
gameCtrl.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;