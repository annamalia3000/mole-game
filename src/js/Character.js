export default class Character {
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

