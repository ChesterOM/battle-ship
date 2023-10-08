const generateGameBoard = () => {
    const gameBoards = document.querySelectorAll('.gameboard');
    const boardSize = 10;

    gameBoards.forEach(board => {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                board.appendChild(cell);
            }
        }
    });
};

generateGameBoard()