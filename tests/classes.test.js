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