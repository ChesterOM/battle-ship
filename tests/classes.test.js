const { Ship } = require('../js/classes');



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
    })
})

describe('gameboard testing', () => {
    test('places a ship at specified coordinates', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip(3, [1, 1]);
        // Add more assertions depending on how I store ships
    });

    test('records a hit or miss when attacked', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip(2, [1, 1], [1, 2]);
        expect(gameboard.receiveAttack([1, 1])).toBe('hit');
        expect(gameboard.receiveAttack([2, 2])).toBe('miss');
    });

    test('identifies when all ships have been sunk', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip(1, [1, 1]);
        gameboard.receiveAttack([1, 1]);
        expect(gameboard.allShipsSunk()).toBe(true);
    });
})