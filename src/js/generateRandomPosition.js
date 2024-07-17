export default function generateRandomPosition(boardSize) {
    return Math.floor(Math.random() * (boardSize ** 2));
}