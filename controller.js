import { renderGameboard, playerAttack } from './dom-interaction/dom-manipulator.js';
import { generateGameBoard } from './dom-interaction/generate_gameboard.js';
import { Player } from './classes/players.js';
import { Ship } from './classes/ships.js'



function initGame() {
    const human = new Player('human');
    const computer = new Player('computer');

    // Manually place ships for human
    const humanShip1 = new Ship(5);  // A ship of length 5
    human.gameboard.placeShip(humanShip1, [0,0], 'horizontal');

    const humanShip2 = new Ship(4);  // A ship of length 4
    human.gameboard.placeShip(humanShip2, [5,5], 'vertical');

    // ... add more if you want for human

    // Manually place ships for computer (for testing purposes)
    const computerShip1 = new Ship(5);  // A ship of length 5
    computer.gameboard.placeShip(computerShip1, [2,2], 'horizontal');

    const computerShip2 = new Ship(4);  // A ship of length 4
    computer.gameboard.placeShip(computerShip2, [6,4], 'vertical');
    
    const computerShip3 = new Ship(2);  // A ship of length 5
    computer.gameboard.placeShip(computerShip3, [0,0], 'horizontal');

    // ... add more if you want for computer

    renderGameboard(human.gameboard, 'gameboard-player');
    renderGameboard(computer.gameboard, 'gameboard-ai');

    playerAttack(human, computer.gameboard, computer);
    
}

generateGameBoard()
document.querySelector(".start-game").addEventListener("click", initGame);