const { GameBoard } = require('../classes/gameboard.js');
const { Ship } = require('../classes/ships.js');
const { Player } = require('../classes/players.js');




describe('ship testing', () => {
    test('creates a ship with a specified length', () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
    });

    test('ship records a hit', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('does ship sink', () => {
        const ship = new Ship(2)
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })
})

describe('gameboard testing', () => {
    test('places a ship at specified coordinates', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(3);
        gameboard.placeShip(ship, [1, 1], 'horizontal');
        expect(gameboard.board[1][1]).toBe(ship);
        expect(gameboard.board[2][1]).toBe(ship);
        expect(gameboard.board[3][1]).toBe(ship);
    });

    test('records a hit or miss when attacked', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(2)
        gameboard.placeShip(ship,[1, 1],'horizontal');
        expect(gameboard.receiveAttack([1, 1])).toBe('hit');
        expect(gameboard.receiveAttack([2, 2])).toBe('miss');
    });

    test('manual ship sink', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    test('identifies when all ships have been sunk', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(3)
        gameboard.placeShip(ship,[1, 1], 'horizontal');
        gameboard.receiveAttack([1, 1]);
        gameboard.receiveAttack([2, 1]);
        gameboard.receiveAttack([3, 1]);
        expect(gameboard.allShipsSunk()).toBe(true);
    });

    test('initializes gameboard with default size', () => {
        const gameboard = new GameBoard();
        expect(gameboard.board.length).toBe(10);
        expect(gameboard.board[0].length).toBe(10);
    });

    test('initializes gameboard with custom size', () => {
        const gameboard = new GameBoard(5);
        expect(gameboard.board.length).toBe(5);
        expect(gameboard.board[0].length).toBe(5);
    });

    test('throws error for invalid horizontal ship placement', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(3);
        expect(() => {
            gameboard.placeShip(ship, [8, 8], 'horizontal');
        }).toThrow('Invalid Ship Placement');
    });

    test('throws error for invalid vertical ship placement', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(4);
        expect(() => {
            gameboard.placeShip(ship, [8, 8], 'vertical');
        }).toThrow('Invalid Ship Placement');
    });

    test('places ship vertically correctly', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(3);
        gameboard.placeShip(ship, [3, 3], 'vertical');
        expect(gameboard.board[3][3]).toBe(ship);
        expect(gameboard.board[3][4]).toBe(ship);
        expect(gameboard.board[3][5]).toBe(ship);
    });

    test('records a miss when attacked on empty coordinate', () => {
        const gameboard = new GameBoard();
        expect(gameboard.receiveAttack([5, 5])).toBe('miss');
    });

    test('sinks ships independently', () => {
        const gameboard = new GameBoard(10);
        const ship1 = new Ship(2);
        const ship2 = new Ship(3);
        gameboard.placeShip(ship1, [1, 1], 'horizontal');
        gameboard.placeShip(ship2, [4, 4], 'vertical');
        
        gameboard.receiveAttack([1, 1]);
        gameboard.receiveAttack([2, 1]);
        expect(ship1.isSunk()).toBe(true);
        expect(ship2.isSunk()).toBe(false);
        
        gameboard.receiveAttack([4, 4]);
        gameboard.receiveAttack([4, 5]);
        gameboard.receiveAttack([4, 6]);
        expect(ship2.isSunk()).toBe(true);
    });
});

describe('player testing', () => {
    
    test('creates a player with default type human', () => {
        const player = new Player();
        expect(player.type).toBe('human');
    });

    test('creates a computer player', () => {
        const player = new Player('computer');
        expect(player.type).toBe('computer');
    });

    test('player can place a ship on their gameboard', () => {
        const player = new Player();
        const ship = new Ship(3);
        player.placeShip(ship, [0, 0], 'horizontal');
        expect(player.gameboard.board[0][0]).toBe(ship);
    });

    test('player can attack opponent gameboard', () => {
        const player1 = new Player();
        const player2 = new Player();
        const ship = new Ship(3);
        player2.placeShip(ship, [0, 0], 'horizontal');
        expect(player1.attack(player2.gameboard, [0, 0])).toBe('hit');
        expect(player1.attack(player2.gameboard, [9, 9])).toBe('miss');
    });

    test('allShipsSunk returns correct value', () => {
        const player = new Player();
        const ship = new Ship(2);
        player.placeShip(ship, [0, 0], 'horizontal');
        player.gameboard.receiveAttack([0, 0]);
        player.gameboard.receiveAttack([1, 0]);
        expect(player.allShipsSunk()).toBe(true);
    });

    test('computer can make a legal random attack', () => {
        const computer = new Player('computer');
        const opponent = new Player();
        for (let i = 0; i < 100; i++) { 
            expect(() => {
                computer.computerAttack(opponent.gameboard);
            }).not.toThrow(Error);
        }
    });

}); 