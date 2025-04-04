import Snake from './Snake.js';
import Fruit from './Fruit.js';

class Map {
    constructor(size) {
        this.Size = size;
        this.TileSize = 450 / size;
        this.Snake = new Snake(size);
        this.isGameEnded = false;
        this.Fruit = new Fruit();
        this.Images = {};
        this.Fruit.GenerateRandomCords(size);
    }

    async init() {
        await this.loadImages();
    }

    loadImages() {
        const imageList = {
            head_UP: 'Assets/Head_Up.png',
            head_DOWN: 'Assets/Head_Down.png',
            head_LEFT: 'Assets/Head_Left.png',
            head_RIGHT: 'Assets/Head_Right.png',
            tail_UP: 'Assets/Tail_Up.png',
            tail_DOWN: 'Assets/Tail_Down.png',
            tail_LEFT: 'Assets/Tail_Left.png',
            tail_RIGHT: 'Assets/Tail_Right.png',
            body_skret_1: 'Assets/Body_Skret_Down_Right.png',
            body_skret_2: 'Assets/Body_Skret_Left_Down.png',
            body_skret_3: 'Assets/Body_Skret_Right_Up.png',
            body_skret_4: 'Assets/Body_Skret_Up_Left.png',
            Body_Col: 'Assets/Body_Col.png',
            Body_Row: 'Assets/Body_Row.png',
            Tail_skret_1: 'Assets/Tail_Skret_Down_Left.png',
            Tail_skret_2: 'Assets/Tail_Skret_Down_Right.png',
            Tail_skret_3: 'Assets/Tail_Skret_Left_Down.png',
            Tail_skret_4: 'Assets/Tail_Skret_Left_Up.png',
            Tail_skret_5: 'Assets/Tail_Skret_Right_Down.png',
            Tail_skret_6: 'Assets/Tail_Skret_Right_Up.png',
            Tail_skret_7: 'Assets/Tail_Skret_Up_Left.png',
            Tail_skret_8: 'Assets/Tail_Skret_Up_Right.png'
        };

        const promises = Object.entries(imageList).map(([key, src]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve({ key, img });
                img.onerror = reject;
            });
        });

        return Promise.all(promises).then(results => {
            results.forEach(({ key, img }) => {
                this.Images[key] = img;
            });
        });
    }

    Draw(ctx) {
        ctx.clearRect(0, 0, 450, 450);
        ctx.fillStyle = 'black';

        for (let y = 0; y < this.Size; y++) {
            for (let x = 0; x < this.Size; x++) {
                ctx.fillRect(x * this.TileSize, y * this.TileSize, this.TileSize, this.TileSize);
            }
        }

        ctx.fillStyle = 'green';
        for (let y = 0; y < this.Size; y++) {
            for (let x = 0; x < this.Size; x++) {
                ctx.fillRect(x * this.TileSize, y * this.TileSize, this.TileSize - 1, this.TileSize - 1);
            }
        }

        for (let j = 0; j < this.Snake.SnakeParts.length; j++) {
            const part = this.Snake.SnakeParts[j];
            const image = this.Images[part.Image];
            if (image) {
                ctx.drawImage(
                    image,
                    part.x * this.TileSize,
                    part.y * this.TileSize,
                    45,
                    45
                );
            }
        }

        ctx.fillStyle = 'purple';
        ctx.fillRect(this.Fruit.x * this.TileSize, this.Fruit.y * this.TileSize, this.TileSize - 1, this.TileSize - 1);
    }

    async DrawGame(ctx) {
        while (!this.isGameEnded) {
            this.Snake.Move();
            this.Snake.ChangeAllImages();

            if (this.Snake.CheckHeadPosition(this.Size)) {
                if (this.Snake.CheckIfEatFruit(this.Fruit)) {
                    this.Fruit.GenerateRandomCords(this.Size);
                }
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