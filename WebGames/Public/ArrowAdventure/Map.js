import Tile from './Tile.js';
import Rabbit from './Animals/Rabbit.js';
import Player from './Player.js';

class Map {
    constructor(size) {
        this.Tiles = [];
        this.animals = [];
        this.Size = size;
        this.Player = new Player(25, 25);
        this.Images = {};
        this.loadImages(); 
        this.initialize();

        this.CrateAnimals();
    }


    loadImages() {
        this.Images["grass"] = new Image();
        this.Images["grass"].src = 'images/grass.jpg';

        this.Images["water"] = new Image();
        this.Images["water"].src = 'images/water.jpg';

        this.Images["desert"] = new Image();
        this.Images["desert"].src = 'images/sand.jpg';

        this.Images["snow"] = new Image();
        this.Images["snow"].src = 'images/snow.jpg';
    }

    CrateAnimals() {
        this.animals.push(new Rabbit(0, 0));
        this.animals.push(new Rabbit(5, 5));
        this.animals.push(new Rabbit(10, 10));
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

    CreateBiomHelper(Type, CanStand, imageSource, x, y, depth) {
        let chance = Math.floor(Math.random() * 5);
        if (chance !== 0) {
            if (depth > 0 && this.checkPosition(x, y)) {
                this.Tiles[x][y] = new Tile(Type, CanStand, x, y, 40, imageSource);
                this.CreateBiomHelper(Type, CanStand, imageSource, x + 1, y, depth - 1);
                this.CreateBiomHelper(Type, CanStand, imageSource, x - 1, y, depth - 1);
                this.CreateBiomHelper(Type, CanStand, imageSource, x, y + 1, depth - 1);
                this.CreateBiomHelper(Type, CanStand, imageSource, x, y - 1, depth - 1);
            }
        }
    }

    CreateBiom(Type, CanStand, imageSource) {
        for (let i = 0; i < 2; i++) {
            let posX = Math.floor(Math.random() * this.Size);
            let posY = Math.floor(Math.random() * this.Size);
            for (let j = 0; j < 3; j++) {
                this.CreateBiomHelper(Type, CanStand, imageSource, posX + j, posY, 12);
            }
        }
    }

    checkPosition(x, y) {
        return x >= 0 && x < this.Size && y >= 0 && y < this.Size;
    }

    checkCanStand(x, y) {
        if (this.checkPosition(x, y)) {
            if (this.Tiles[x][y].CanStand) return true;
        }
        return false;
    }

    CheckPlayerCanMove(direction) {
        if (direction === 0) return this.checkPosition(this.Player.x, this.Player.y) && this.checkCanStand(this.Player.x, this.Player.y - 1);
        if (direction === 1) return this.checkPosition(this.Player.x, this.Player.y) && this.checkCanStand(this.Player.x, this.Player.y + 1);
        if (direction === 2) return this.checkPosition(this.Player.x, this.Player.y) && this.checkCanStand(this.Player.x + 1, this.Player.y);
        if (direction === 3) return this.checkPosition(this.Player.x, this.Player.y) && this.checkCanStand(this.Player.x - 1, this.Player.y);
    }

    draw(ctx, camera, cameraSize) {
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

        this.animals.forEach(animal => {
            if (this.isWithinCamera(animal, camera, cameraSize)) {
                animal.drawAnimal(camera,ctx);
            }
        });

        this.Player.DrawPlayer(camera,ctx);
    }

    update(ctx,camera, cameraSize) {
        this.animals.forEach(animal => {
            animal.move(this.Size);
        });
        this.draw(ctx, camera, cameraSize);
    }

    isWithinCamera(animal, camera, cameraSize) {
        return (
            animal.x >= camera.x && animal.x < camera.x + cameraSize &&
            animal.y >= camera.y && animal.y < camera.y + cameraSize
        );
    }
}

export default Map;