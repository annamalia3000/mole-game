export default class GamePlay {
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

