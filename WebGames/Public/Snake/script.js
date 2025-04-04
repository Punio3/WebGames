import Map from './Map.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const mapSize = 10;

const _Map = new Map(mapSize);

_Map.DrawGame(ctx);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") _Map.Snake.direction=0;
    if (e.key === "ArrowDown") _Map.Snake.direction = 1;
    if (e.key === "ArrowLeft") _Map.Snake.direction = 2;
    if (e.key === "ArrowRight") _Map.Snake.direction = 3;
});
