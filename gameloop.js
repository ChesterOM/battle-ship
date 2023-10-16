import { displayEndgameMessage } from "./dom-interaction/dom-manipulator.js";
import { playerAttack, reflectComputerAttackOnDOM } from './dom-interaction/dom-manipulator.js';
import { GameBoard } from "./classes/gameboard.js";

function playGame(human, computer) {
    if (computer.gameboard.allShipsSunk()) {
        displayEndgameMessage('Player 1 Wins');
        return;
    }
    setTimeout(() => {
        computerMove(human, computer);
    }, 1000);  
}

function computerMove(human, computer) {
    if (!human.gameboard.allShipsSunk()) {
        const coord = computer.computerAttack(human.gameboard);
        const attackResult = human.gameboard.receiveAttack(coord);
        
        reflectComputerAttackOnDOM(coord, attackResult);

        if (human.gameboard.allShipsSunk()) {
            displayEndgameMessage('Computer Wins');
        } else {
            playerAttack(human, computer.gameboard, computer); 
        }
    }
}


export { playGame };