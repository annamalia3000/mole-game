import Character from './Character';
import generateRandomPosition from './generateRandomPosition';

export default class GameController {
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

