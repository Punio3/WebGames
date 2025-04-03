
import Map from './Map.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 520;
canvas.height = 520;

const mapSize = 50;
const cameraSize = 13;
const camera = { x: 0, y: 0 };

const _Map = new Map(mapSize);
_Map.CreateBiom(2, 1, "desert");
_Map.CreateBiom(3, 1, "snow");
_Map.CreateWater();

function updateGame() {
    camera.x = Math.max(0, Math.min(_Map.Player.x - Math.floor(cameraSize / 2), mapSize - cameraSize));
    camera.y = Math.max(0, Math.min(_Map.Player.y - Math.floor(cameraSize / 2), mapSize - cameraSize));

    _Map.draw(ctx, camera, cameraSize);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && _Map.CheckPlayerCanMove(0)) _Map.Player.SetDirection(0);
    if (e.key === "ArrowDown" && _Map.CheckPlayerCanMove(1)) _Map.Player.SetDirection(1);
    if (e.key === "ArrowLeft" && _Map.CheckPlayerCanMove(3)) _Map.Player.SetDirection(3);
    if (e.key === "ArrowRight" && _Map.CheckPlayerCanMove(2)) _Map.Player.SetDirection(2);
    updateGame();
});

setInterval(() => {
    _Map.update(ctx,camera, cameraSize);
}, 1000);
