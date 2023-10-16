import { Ship } from './ships.js';

class GameBoard {
    constructor(size = 10){
        this.board = Array(size).fill(null).map(row => Array(size).fill(null));
        this.ships = []
        this.missedAttacks = []
        this.hitCoordinates = []
    }

    placeShip(ship, startCoord, orientation = 'horizontal'){
        const [x,y] = startCoord;
        const shipCoords = [];
        
        ship.orientation = orientation;  
        ship.startCoord = startCoord;
        
        for(let i = 0; i < ship.length; i++){
            if (orientation === 'horizontal') {
                shipCoords.push([x + i, y]);
            } else {
                shipCoords.push([x,y + i]);
            }
        }
    
        if (!this.isPlacementValid(shipCoords)) {
            throw new Error('Invalid Ship Placement');
        }
    
        shipCoords.forEach(coord => {
            const [x,y] = coord;
            this.board[x][y] = ship;
        });
        
        this.ships.push(ship);
    }

    isPlacementValid(coords){
        for (let i = 0; i < coords.length; i ++) {
            const [x,y] = coords[i];

            if (x < 0 || x >= this.board.length || y < 0 || y > this.board[0].length){
                return false;
            }

            if (this.board[x][y] !== null) {
                return false;
            }
        }
        return true;
    }

    receiveAttack(coordinates) {
        const [row, col] = coordinates;
        
        if (row < 0 || col < 0 || row >= this.board.length || col >= this.board.length) {
            throw new Error("Invalid coordinates");
        }
        
        if (this.board[row][col] instanceof Ship) {
            const ship = this.board[row][col];
            let position;
    
            if (ship.orientation === 'horizontal') {
                position = col - ship.startCoord[1];
            } else {
                position = row - ship.startCoord[0];
            }
            
            ship.hit(position);
            return 'hit';
        } else if (this.board[row][col] === null) {
            this.board[row][col] = 'miss';
            return 'miss';
        } else {
            return 'already attacked';
        }
    }

    allShipsSunk(){
        console.log('Checking if all ships are sunk.');//test
        this.ships.forEach(ship => console.log(ship.hits));
        console.log(this.ships.every(ship => ship.isSunk()));//test
        return this.ships.every(ship => ship.isSunk());
    }

    isLegalMove(coord){
        const [x, y] = coord;

        return x >= 0 && x < this.board.length &&
               y >= 0 && y < this.board[0].length &&
               (this.board[x][y] === null || !this.board[x][y].hits);
    }
}

export { GameBoard };