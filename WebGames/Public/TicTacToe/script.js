
import Field from './Field.js';

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const setSizeButton = document.getElementById('set-size-button');

let Board = [];
var Size = 3;
var WhoMoves = 0;


function resetGame() {
    createBoard();
}

function createBoard() {
    Board = []; 

    for (let i = 0; i < Size; i++) {
        Board[i] = new Array(Size).fill(null);
    }

    gameBoard.innerHTML = '';

    gameBoard.style.gridTemplateColumns = `repeat(${Size}, ${100 / Size}%)`;
    gameBoard.style.gridTemplateRows = `repeat(${Size}, ${100 / Size}%)`;

    for (let i = 0; i < Size; i++) {
        for (let j = 0; j < Size; j++) {
            const field = new Field(i,j);
            Board[i][j] = field; 

            field.element.addEventListener('click', () => handleCardClick(field));

            field.element.style.width = '100%';
            field.element.style.height = '100%';

            gameBoard.appendChild(field.element);
        }
    }
}

function handleCardClick(field) {
    if (field.Symbol === "") {
        if (WhoMoves === 0) {
            field.SetValue('O');
            StartCheckingWin('O');
            WhoMoves = 1;
        } else {
            field.SetValue('X');
            StartCheckingWin('X');
            WhoMoves = 0;
        }
    }
}
function StartCheckingWin(Symbol) {
    for (let i = 0; i < Size; i++) {
        if (Board[0][i].Symbol === Symbol) {
            CheckWin(Board[0][i], 0, 1);
            CheckWin(Board[0][i], 1, 1);
            CheckWin(Board[0][i], 2, 1);
            CheckWin(Board[0][i], 3, 1);
        }
        if (Board[i][0].Symbol === Symbol) {
            CheckWin(Board[i][0], 0, 1);
            CheckWin(Board[i][0], 1, 1);
            CheckWin(Board[i][0], 2, 1);
            CheckWin(Board[i][0], 3, 1);
        }
    }
}
function CheckWin(field, variant, counter) {
    if (counter === Size) {
        field.element.style.backgroundColor = "#00FFFF";
        return true;
    }
    if (variant === 0) {
        if (field.row + 1 < Size) {
            if (field.CheckNieghbour(Board[field.row + 1][field.col])) {
                if (CheckWin(Board[field.row + 1][field.col], 0, counter+1)) {
                    field.element.style.backgroundColor = "#00FFFF";
                    return true;
                }
            }
        }
    } else if (variant === 1) {
        if (field.col + 1 < Size) {
            if (field.CheckNieghbour(Board[field.row][field.col + 1])) {
                if (CheckWin(Board[field.row][field.col + 1], 1, counter+1)) {
                    field.element.style.backgroundColor = "#00FFFF";
                    return true;
                }
            }
        }
    } else if (variant === 2) {
        if (field.col + 1 < Size && field.row+1<Size) {
            if (field.CheckNieghbour(Board[field.row + 1][field.col + 1])) {
                if (CheckWin(Board[field.row + 1][field.col + 1], 2, counter+1)) {
                    field.element.style.backgroundColor = "#00FFFF";
                    return true;
                }
            }
        }
    } else if (variant === 3) {
        if (field.col + 1 < Size && field.row - 1 >=0) {
            if (field.CheckNieghbour(Board[field.row - 1][field.col + 1])) {
                if (CheckWin(Board[field.row - 1][field.col + 1], 3, counter+1)) {
                    field.element.style.backgroundColor = "#00FFFF";
                    return true;
                }
            }
        }
    }
    return false;
}
function updateBoardSize() {
    Size = parseInt(document.getElementById('rows').value, 10);
}

restartButton.addEventListener('click', resetGame);
setSizeButton.addEventListener('click', updateBoardSize);

createBoard();