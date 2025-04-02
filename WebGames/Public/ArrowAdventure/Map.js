import Tile from './Tile.js';
import Rabbit from './Animals/Rabbit.js';
class Map {
    constructor(size) {
        this.Tiles = [];
        this.animals = [];
        this.Size = size;
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

        this.Images["rabbit"] = new Image();
        this.Images["rabbit"].src = 'images/rabbit.png';
    }

    CrateAnimals() {
        this.addAnimal(new Rabbit(0, 0));
        this.addAnimal(new Rabbit(5, 5));
        this.addAnimal(new Rabbit(10, 10));
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

        this.animals.forEach(animal => {
            if (this.isWithinCamera(animal, camera, cameraSize)) {
                this.drawAnimal(animal,camera,ctx);
            }
        });

        ctx.fillStyle = "red";
        ctx.fillRect((player.x - camera.x) * 40, (player.y - camera.y) * 40, 40, 40);
    }

    drawAnimal(animal,camera,ctx) {
        const img = this.Images[animal.Image];
        if (img.complete) {
            ctx.drawImage(img, (animal.x - camera.x) * 40, (animal.y - camera.y) * 40, 40, 40);
        }
    }

    addAnimal(animal) {
        this.animals.push(animal);
    }

    update(ctx,camera,player, cameraSize) {
        this.animals.forEach(animal => {
            animal.move(this.Size);
        });
        this.draw(ctx, camera, cameraSize, player);
    }

    isWithinCamera(animal, camera, cameraSize) {
        return (
            animal.x >= camera.x && animal.x < camera.x + cameraSize &&
            animal.y >= camera.y && animal.y < camera.y + cameraSize
        );
    }
}

export default Map;