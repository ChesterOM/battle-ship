import { GameBoard } from './gameboard.js';


class Player {
    constructor(type = 'human'){
        this.gameboard = new GameBoard();
        this.type = type;
        this.previousAttacks = [];
    }

    attack(gameboard, coord) {
        return gameboard.receiveAttack(coord);
    }


    randomCoordinate(boardSize){
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        return [x,y];
    }

    computerAttack(gameboard) {
        const boardSize = gameboard.board.length;
        let row, col;
    
        do {
            [row, col] = this.randomCoordinate(boardSize);
        } while (this.previousAttacks.includes(`${row},${col}`));
    
        this.previousAttacks.push(`${row},${col}`);
        return [row, col]; 
    }

}

export { Player };