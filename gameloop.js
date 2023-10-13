import { displayEndgameMessage } from "./dom-interaction/dom-manipulator.js";

function playGame(human, computer) {
    if (computer.allShipsSunk()) {
        displayEndgameMessage('Player 1 Wins');
    } 
    else {
        computerMove(human, computer);
    }
}

function computerMove(human, computer) {
    if (!human.allShipsSunk()) {
        computer.computerAttack(human.gameboard);

        if (human.allShipsSunk()) {
            displayEndgameMessage('Computer Wins');
        }
    }
}


export { playGame };