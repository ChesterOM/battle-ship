const { GameBoard } = require('./classes/gameboard.js');
const { Ship } = require('./classes/ships.js');
const { Player } = require('./classes/players.js');


function playGame() {
    const human = new Player('human');
    const computer =  new Player('computer');

    while (!human.allShipsSunk() && !computer.allShipsSunk()) {
        const humanCoord = null
        human.attack(computer.gameboard, human);

        if (computer.allShipsSunk()) break;

        computer.computerAttack(human.gameboard);
    }

    if (human.allShipsSunk()) {
        console.log('Computer Wins');
    } else {
        console.log('Player 1 Wins');
    }
}