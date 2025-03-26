import Card from './Card.js';

let colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F0F033', '#FF33F0', '#33FFF0', '#F033FF',
    '#FF00FF', '#00FFFF', '#FFFF00', '#800080', '#008000', '#FF1493', '#FFD700'
];

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const setSizeButton = document.getElementById('set-size-button');

let flippedCards = [];
let cards = [];
let row, col;
row = 4;
col = 7;

function createCards() {
    let index = 0;
    const totalCards = row*col;

    gameBoard.innerHTML = '';

    gameBoard.style.gridTemplateColumns = `repeat(${col}, ${100 / col}%)`;
    gameBoard.style.gridTemplateRows = `repeat(${row}, ${100 / row}%)`;

    for (let i = 0; i < totalCards; i++) {
        const color = colors[i % colors.length];
        const card = new Card(color, index);
        card.element.addEventListener('click', () => handleCardClick(card));

        card.element.style.width = '100%';
        card.element.style.height = '100%';

        gameBoard.appendChild(card.element);
        cards.push(card);
        index++;
    }
}

function handleCardClick(card) {
    if (flippedCards.length === 2) return;

    card.flipCard();
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        if (card1.color === card2.color) {
            flippedCards = [];
        } else {
            setTimeout(() => {
                card1.hideCard();
                card2.hideCard();
                flippedCards = [];
            }, 1000);
        }
    }
}

function resetGame() {
    flippedCards = [];

    cards.forEach(card => card.hideCard());

    createCards(); 
}

function updateBoardSize() {
    row = parseInt(document.getElementById('rows').value, 10);
    col = parseInt(document.getElementById('cols').value, 10);
}

restartButton.addEventListener('click', resetGame);
setSizeButton.addEventListener('click', updateBoardSize);

createCards();