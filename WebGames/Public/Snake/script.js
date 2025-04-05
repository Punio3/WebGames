import Map from './Map.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restart-button');
const TimerLabel = document.getElementById('Timer');
const TriesAmonutLabel = document.getElementById('Points');

canvas.width = 550;
canvas.height = 550;

const mapSize = 10;
let timer;
let secondsElapsed = 0;

const _Map = new Map(mapSize);
await _Map.init();

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") _Map.Snake.direction=0;
    if (e.key === "ArrowDown") _Map.Snake.direction = 1;
    if (e.key === "ArrowLeft") _Map.Snake.direction = 2;
    if (e.key === "ArrowRight") _Map.Snake.direction = 3;
});

function resetGame() {
    _Map.ResetMap();
    secondsElapsed = 0;

    TimerLabel.textContent = '00:00';
    TriesAmonutLabel.textContent = `0`;

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    _Map.DrawGame(ctx);
}

function updateTimer() {
    if (_Map.isGameEnded) {
        clearInterval(timer);
        return;
    }

    secondsElapsed++;
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    TimerLabel.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


restartButton.addEventListener('click', resetGame);

resetGame();