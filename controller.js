import { renderGameboard, playerAttack } from './dom-interaction/dom-manipulator.js';
import { generateGameBoard } from './dom-interaction/generate_gameboard.js';
import { playGame } from './gameloop.js';
import { Player } from './classes/players.js';


function initGame() {
    const human = new Player('human');
    const computer = new Player('computer');

    renderGameboard(human.gameboard, 'gameboard-player');
    renderGameboard(computer.gameboard, 'gameboard-ai');

    playerAttack(computer.gameboard);
    
    playGame(human, computer);
}

generateGameBoard()
initGame()