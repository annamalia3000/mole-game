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
    this.cells = Array.from(this.boardEl.children);
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
}
;// CONCATENATED MODULE: ./src/js/generateRandomPosition.js
function generateRandomPosition(boardSize) {
  return Math.floor(Math.random() * boardSize ** 2);
}
;// CONCATENATED MODULE: ./src/js/GameController.js


class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.boardSize = 4;
    this.character = new Character();
    this.moveInterval = null;
    this.moveIntervalTime = 2000;
  }
  init() {
    this.gamePlay.drawUi();
    this.placeCharacterRandomly();
    this.startMovingCharacter();
  }
  placeCharacterRandomly() {
    const position = generateRandomPosition(this.boardSize);
    const cell = this.gamePlay.cells[position];
    this.character.setElement(cell);
  }
  startMovingCharacter() {
    this.moveInterval = setInterval(() => {
      const position = generateRandomPosition(this.boardSize);
      this.moveCharacter(position);
    }, this.moveIntervalTime);
  }
  moveCharacter(newPosition) {
    const currentCell = this.character.element.parentElement;
    const newCell = this.gamePlay.cells[newPosition];
    if (currentCell !== newCell) {
      this.character.moveTo(newCell);
    }
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