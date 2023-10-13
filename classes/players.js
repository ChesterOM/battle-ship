import { GameBoard } from './gameboard.js';
import { Ship } from './ships.js';


class Player {
    constructor(type = 'human'){
        this.gameboard = new GameBoard();
        this.type = type;
    }

    placeShip(ship, coord, orientation) {
        this.gameboard.placeShip(ship, coord, orientation);
    }

    attack(gameboard, coord) {
        return gameboard.receiveAttack(coord);
    }

    allShipsSunk() {
        return this.gameboard.allShipsSunk()
    }

    randomCoordinate(boardSize){
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        return [x,y];
    }

    computerAttack(opponentGameboard){
        let coord;
        do {
            coord = this.randomCoordinate(opponentGameboard.board.length);
        } while (opponentGameboard.board[coord[0]][coord[1]] === 'miss' || 
                opponentGameboard.board[coord[0]][coord[1]] instanceof Ship &&
                typeof opponentGameboard.board[coord[0]][coord[1]] === 'number'
                );
        return this.attack(opponentGameboard, coord);
    }

}

export { Player };