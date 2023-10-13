import { Ship } from '../classes/ships.js';

function renderGameboard(gameboard, elementID) {
    const boardDiv = document.getElementById(elementID);

    boardDiv.innerHTML = '';

    gameboard.board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = rowIndex;
            cellDiv.dataset.col = colIndex;

            if (cell instanceof Ship) {
                cellDiv.classList.add('ship');
            } else if (cell === 'miss') {
                cellDiv.classList.add('miss');
            } else if (cell === 'hit'){
                cellDiv.classList.add('hit');
            } else {
                cellDiv.classList.add('empty');
            }
            boardDiv.appendChild(cellDiv);
        });
    });
}

function playerAttack(computerGameboard){
    const aiBoardDiv = document.getElementById('gameboard-ai');

    aiBoardDiv.addEventListener('click', function attackListener(event) {
        if (event.target.classList.containts('cell')) {
            const row = parseInt(event.target.dataset.row, 10);
            const col = parseInt(event.target.dataset.col, 10);

            const result = human.attack(computerGameboard, [row,col]);

            if (result === 'hit') {
                event.target.classList.add('hit');
            } else if (result === 'miss'){
                event.target.classList.add('miss');
            }

            aiBoardDiv.removeEventListener('click', attackListener);
        }
    });
}

function displayEndgameMessage(winner){
    const messageDiv = document.createElement('div');

    messageDiv.classList.add('endgame-message');
    messageDiv.textContent = `${winner} Wins!`;

    document.body.appendChild(messageDiv);
}

export { renderGameboard, playerAttack, displayEndgameMessage };
