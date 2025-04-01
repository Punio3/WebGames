import Tile from './Tile.js';

class Map {
    constructor(size) {
        this.Tiles = [];
        this.Size = size;
        this.Images = {};
        this.loadImages(); 
        this.initialize();
    }


    loadImages() {
        this.Images["grass"] = new Image();
        this.Images["grass"].src = 'images/grass.jpg';

        this.Images["water"] = new Image();
        this.Images["water"].src = 'images/water2.jpg';
    }

    initialize() {
        for (let i = 0; i < this.Size; i++) {
            const row = [];
            for (let j = 0; j < this.Size; j++) {
                row.push(new Tile(0, 1, i, j, 40, "grass"));
            }
            this.Tiles.push(row);
        }
    }

    createWaterHelper(x, y, depth) {
        if (depth > 0 && this.checkPosition(x, y)) {
            this.Tiles[x][y] = new Tile(1, 0, x, y, 40, "water");
            this.createWaterHelper(x + 1, y, depth - 1);
            this.createWaterHelper(x - 1, y, depth - 1);
            this.createWaterHelper(x, y + 1, depth - 1);
            this.createWaterHelper(x, y - 1, depth - 1);
        }
    }

    CreateWater() {
        for (let i = 0; i < 5; i++) {
            let posX = Math.floor(Math.random() * this.Size);
            let posY = Math.floor(Math.random() * this.Size);
            for (let j = 0; j < 3; j++) {
                this.createWaterHelper(posX + j, posY, 4);
            }
        }
    }

    checkPosition(x, y) {
        return x >= 0 && x < this.Size && y >= 0 && y < this.Size;
    }

    checkCanStand(x,y) {
        if (this.Tiles[x][y].CanStand) return true;
        return false;
    }

    draw(ctx, camera, cameraSize, player) {
        ctx.clearRect(0, 0, 400, 400);

        for (let y = 0; y < cameraSize; y++) {
            for (let x = 0; x < cameraSize; x++) {
                const mapX = camera.x + x;
                const mapY = camera.y + y;

                if (mapX < this.Size && mapY < this.Size) {
                    const tile = this.Tiles[mapX][mapY];
                    const img = this.Images[tile.Image]; 

                    if (img.complete) {
                        ctx.drawImage(img, x * tile.Size, y * tile.Size, tile.Size, tile.Size);
                    }
                }
            }
        }

        ctx.fillStyle = "red";
        ctx.fillRect((player.x - camera.x) * 40, (player.y - camera.y) * 40, 40, 40);
    }
}

export default Map;