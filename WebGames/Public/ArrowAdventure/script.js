const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const tileSize = 40;
const mapSize = 50;
const cameraSize = 10; 

const player = { x: 25, y: 25 };
const camera = { x: 0, y: 0 }; 

const images = {
    grass: new Image(),
    water: new Image(),
};

images.grass.src = 'images/grass.jpg';
images.water.src = 'images/water2.jpg';

const map = [];
for (let i = 0; i < mapSize; i++) {
    const row = [];
    for (let j = 0; j < mapSize; j++) {
        row.push(0);
    }
    map.push(row);
}

CreateWater();

function CreateWaterHelper(x, y, depth) {
    if (depth > 0 && CheckPosition(x, y)) {
        map[x][y] = 1; 
        CreateWaterHelper(x + 1, y, depth - 1);
        CreateWaterHelper(x - 1, y, depth - 1);
        CreateWaterHelper(x, y + 1, depth - 1);
        CreateWaterHelper(x, y - 1, depth - 1);
    }
}

function CreateWater() {
    for (let i = 0; i < 5; i++) {
        let posX = Math.floor(Math.random() * mapSize);
        let posY = Math.floor(Math.random() * mapSize);

        for (let j = 0; j < 3; j++) {
            CreateWaterHelper(posX+j, posY, 4);
        }

    }
}

function CheckPosition(x, y) {
    if (x < mapSize && x >= 0 && y < mapSize && y >= 0) return true;
    return false;
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < cameraSize; y++) {
        for (let x = 0; x < cameraSize; x++) {
            const mapX = camera.x + x;
            const mapY = camera.y + y;

            if (mapX < mapSize && mapY < mapSize) {
                const tileType = map[mapX][mapY];
                if (tileType === 0) {
                    ctx.drawImage(images.grass, x * tileSize, y * tileSize, tileSize, tileSize);
                } else if (tileType === 1) {
                    ctx.drawImage(images.water, x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect((player.x - camera.x) * tileSize, (player.y - camera.y) * tileSize, tileSize, tileSize);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && player.y > 0) player.y--;
    if (e.key === "ArrowDown" && player.y < mapSize - 1) player.y++;
    if (e.key === "ArrowLeft" && player.x > 0) player.x--;
    if (e.key === "ArrowRight" && player.x < mapSize - 1) player.x++;

    camera.x = Math.max(0, Math.min(player.x - Math.floor(cameraSize / 2), mapSize - cameraSize));
    camera.y = Math.max(0, Math.min(player.y - Math.floor(cameraSize / 2), mapSize - cameraSize));

    draw();
});

images.grass.onload = () => {
    images.water.onload = () => {
        draw();
    };
};