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
                shipCoords.push([x, y + i]); 
            } else {
                shipCoords.push([x + i, y]); 
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

            if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length){
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
        
        console.log("Row:", row);
        console.log("Col:", col);
        console.log("Type of Row:", typeof row);
        console.log("Type of Col:", typeof col);

        if (this.board[row][col] instanceof Ship) {
            const ship = this.board[row][col];
            let position;
            if (ship.orientation === 'horizontal') {
                position = col - ship.startCoord[1]; // Position relative to the ship's starting column
            } else { // vertical
                position = row - ship.startCoord[0]; // Position relative to the ship's starting row
            }

            console.log("Calculated position:", position);
            console.log(`Ship orientation: ${ship.orientation}`);
        console.log(`Ship startCoord: ${ship.startCoord}`);
        console.log(`Attack position: ${coordinates}`);
        console.log(`Position in ship: ${position}`);

            ship.hit(position);
            this.board[row][col] = 'hit'; // Mark board as hit.
            return 'hit';
        } else if (this.board[row][col] === null) {
            this.board[row][col] = 'miss'; // Mark board as miss if it's null.
            return 'miss';
        }
        return 'already attacked'; // This would only happen if it's already been marked as a hit or miss.
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