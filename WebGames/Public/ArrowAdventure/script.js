
import Map from './Map.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 520;
canvas.height = 520;

const mapSize = 50;
const cameraSize = 13;

const player = { x: 25, y: 25 };
const camera = { x: 0, y: 0 };

const _Map = new Map(mapSize);
_Map.CreateBiom(2, 1, "desert");
_Map.CreateBiom(3, 1, "snow");
_Map.CreateWater();
function updateGame() {
    camera.x = Math.max(0, Math.min(player.x - Math.floor(cameraSize / 2), mapSize - cameraSize));
    camera.y = Math.max(0, Math.min(player.y - Math.floor(cameraSize / 2), mapSize - cameraSize));

    _Map.draw(ctx, camera, cameraSize, player);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && player.y > 0 && _Map.checkCanStand(player.x,player.y-1)) player.y--;
    if (e.key === "ArrowDown" && player.y < mapSize - 1 && _Map.checkCanStand(player.x, player.y + 1)) player.y++;
    if (e.key === "ArrowLeft" && player.x > 0 && _Map.checkCanStand(player.x - 1, player.y)) player.x--;
    if (e.key === "ArrowRight" && player.x < mapSize - 1 && _Map.checkCanStand(player.x + 1, player.y)) player.x++;
    updateGame();
});
