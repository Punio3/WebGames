import Card from './Card.js';

let colors = [
    '#FF0000',  // Czerwony
    '#00FF00',  // Zielony
    '#0000FF',  // Niebieski
    '#FFFF00',  // ¯ó³ty
    '#FF00FF',  // Ró¿owy
    '#00FFFF',  // Cyjan
    '#FFA500',  // Pomarañczowy
    '#800080',  // Fioletowy
    '#008000',  // Zielony (ciemny)
    '#FFC0CB',  // Jasny ró¿owy
    '#FFD700',  // Z³oty
    '#A52A2A',  // Br¹zowy
    '#000000',  // Czarny
    '#FFFFFF'   // Bia³y
];

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const setSizeButton = document.getElementById('set-size-button');
const TimerLabel = document.getElementById('Timer');
const TriesAmonutLabel = document.getElementById('TriesAmount');
const CorrectParsLabel = document.getElementById('CorrectPars');

let flippedCards = [];
let cards = [];
let row, col;
let AmountOfCorrectPars = 0;
let timer;
let secondsElapsed = 0;
let TriesAmount = 0;
let isGameEnded = false;
function createCards() {
    cards = [];
    let index = 0;

    for (let i = 0; i < (row * col) / 2; i++) {
        let color = colors[i % colors.length]; 
        cards.push(new Card(color, index));
        cards.push(new Card(color, index + 1));
        index += 2;
    }

    shuffleArray(cards); 
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

function AddCardsToBoard() {
    gameBoard.innerHTML = '';

    gameBoard.style.gridTemplateColumns = `repeat(${col}, ${100 / col}%)`;
    gameBoard.style.gridTemplateRows = `repeat(${row}, ${100 / row}%)`;

    cards.forEach(card => {
        card.element.addEventListener('click', () => handleCardClick(card));
        card.element.style.width = '100%';
        card.element.style.height = '100%';
        gameBoard.appendChild(card.element);
    });
}

function handleCardClick(card) {
    if (card.flipped) return;
    if (flippedCards.length === 2) return;

    card.flipCard();
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        if (card1.color === card2.color) {
            flippedCards = [];
            AmountOfCorrectPars++;
            CorrectParsLabel.textContent = `${AmountOfCorrectPars}/${cards.length / 2}`;
            if (AmountOfCorrectPars == cards.length / 2) {
                isGameEnded = true;
            }
        } else {
            setTimeout(() => {
                card1.hideCard();
                card2.hideCard();
                flippedCards = [];
            }, 1000);
        }
        TriesAmount++;
        TriesAmonutLabel.textContent = `${TriesAmount}`;
    }
}

function resetGame() {
    flippedCards = [];
    AmountOfCorrectPars = 0;
    secondsElapsed = 0;
    TriesAmount = 0;
    isGameEnded = false;

    createCards();
    AddCardsToBoard();

    CorrectParsLabel.textContent = `0/${cards.length / 2}`;
    TimerLabel.textContent = '00:00';
    TriesAmonutLabel.textContent = `0`;

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);


}

function updateBoardSize() {
    row = parseInt(document.getElementById('rows').value, 10);
    col = parseInt(document.getElementById('cols').value, 10);
}

function updateTimer() {
    if (isGameEnded) {
        clearInterval(timer); 
        return; 
    }

    secondsElapsed++;
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    TimerLabel.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

restartButton.addEventListener('click', resetGame);
setSizeButton.addEventListener('click', updateBoardSize);

updateBoardSize();
resetGame();