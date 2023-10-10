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

    receiveAttack(coord){
        const [x,y] = coord;
        
        if (this.hitCoordinates.some(([hx,hy]) => hx === x && hy === y)) {
            throw new Error('Coordinate already attacked');
        }

        if (this.board[x][y] instanceof Ship) {
            this.board[x][y].hit();
            this.hitCoordinates.push([x,y]);
            console.log(`Ship at [${x},${y}] has been hit ${this.board[x][y].hits} times.`);
            return 'hit'
        } else {
        this.board[x][y] = 'miss';
        return 'miss';
        }
    }

    allShipsSunk(){
        return this.ships.every(ship => ship.isSunk());
    }

    isLegalMove(coord){
        const [x, y] = coord;

        return x >= 0 && x < this.board.length &&
               y >= 0 && y < this.board[0].length &&
               (this.board[x][y] === null || !this.board[x][y].hits);
    }
}

module.exports = GameBoard;