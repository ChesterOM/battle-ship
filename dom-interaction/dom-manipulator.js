import { Ship } from '../classes/ships.js';
import { playGame } from '../gameloop.js';

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
                cellDiv.classList.add(`ship-${cell.id}`);
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

function playerAttack(human, computerGameboard, computer){
    const aiBoardDiv = document.getElementById('gameboard-ai');

    aiBoardDiv.addEventListener('click', function attackListener(event) {
        if (event.target.classList.contains('cell')) {
            const row = parseInt(event.target.dataset.row, 10);
            const col = parseInt(event.target.dataset.col, 10);

            const result = human.attack(computerGameboard, [row,col]);

            event.target.className = '';
            event.target.classList.add('cell');

            if (result === 'hit') {
                event.target.classList.add('hit');
            } else if (result === 'miss'){
                event.target.classList.add('miss');
            } else {
                event.target.classList.add('empty');
            }

            if (computerGameboard.allShipsSunk()) {
                displayEndgameMessage('Player 1');
                return;
            }

            aiBoardDiv.removeEventListener('click', attackListener);
            playGame(human, computer);
        }
    });
}

function reflectComputerAttackOnDOM(coord, result) {
    const humanBoardDiv = document.getElementById('gameboard-player');
    const cell = humanBoardDiv.querySelector(`[data-row='${coord[0]}'][data-col='${coord[1]}']`);
    
    cell.className = '';
    cell.classList.add('cell');

    if (result === 'hit') {
        cell.classList.add('hit');
    } else if (result === 'miss') {
        cell.classList.add('miss');
    } else {
        cell.classList.add('empty');
    }
}

function displayEndgameMessage(winner){
    const messageDiv = document.createElement('div');
    console.log(`${winner} Wins!`)
    messageDiv.classList.add('endgame-message');
    messageDiv.textContent = `${winner} Wins!`;

    document.body.appendChild(messageDiv);
    
}

export { renderGameboard, playerAttack, displayEndgameMessage, reflectComputerAttackOnDOM };
