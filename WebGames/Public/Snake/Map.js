import Snake from './Snake.js';
import Fruit from './Fruit.js';

class Map {
    constructor(size) {
        this.Size = size;
        this.TileSize = 500 / size;
        this.Snake = new Snake(size);
        this.isGameEnded = false;
        this.Fruit = new Fruit();

        this.Fruit.GenerateRandomCords(size);
    }

    Draw(ctx) {
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = 'black';

        for (let y = 0; y < this.Size; y++) {
            for (let x = 0; x < this.Size; x++) {
                ctx.fillRect(x * this.TileSize, y * this.TileSize, this.TileSize, this.TileSize);
            }
        }

        ctx.fillStyle = 'green';

        for (let y = 0; y < this.Size; y++) {
            for (let x = 0; x < this.Size; x++) {
                ctx.fillRect(x * this.TileSize, y * this.TileSize, this.TileSize-1, this.TileSize-1);
            }
        }

        ctx.fillStyle = 'red';
        for (let j = 0; j < this.Snake.SnakeParts.length; j++) {
            const part = this.Snake.SnakeParts[j];
            ctx.fillRect(part.x * this.TileSize, part.y * this.TileSize, this.TileSize-1, this.TileSize-1);
        }

        ctx.fillStyle = 'purple';
        ctx.fillRect(this.Fruit.x * this.TileSize, this.Fruit.y * this.TileSize, this.TileSize-1, this.TileSize-1);
    }

    async DrawGame(ctx) {
        while (!this.isGameEnded) {
            this.Snake.Move();

            if (this.Snake.CheckHeadPosition(this.Size)) {
                if (this.Snake.CheckIfEatFruit(this.Fruit)) this.Fruit.GenerateRandomCords(this.Size);
                this.Draw(ctx);
                await this.sleep(300);
            } else {
                this.isGameEnded = true;
                console.log("GameEnded");
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Map;