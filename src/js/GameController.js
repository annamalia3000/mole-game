import Character from './Character';
import generateRandomPosition from './generateRandomPosition';
import ScoreBoard from './ScoreBoard';

export default class GameController {
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
            position = (position + 1) % (this.boardSize ** 2);
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
            cell.addEventListener('click', (e) => {
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
