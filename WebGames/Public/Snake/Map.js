import Snake from './Snake.js';
import Fruit from './Fruit.js';

class Map {
    constructor(size) {
        this.Size = size;
        this.TileSize = 550 / size;
        this.Snake = new Snake(size);
        this.isGameEnded = false;
        this.Fruit = new Fruit("fruit");
        this.Images = {};
        this.Fruit.SetCords(size - 3, size - 3);
        this.Points = 0;
    }

    ResetMap() {
        this.Snake = new Snake(this.Size);
        this.Points = 0;
        this.GenerateFruitCords();
        this.isGameEnded = false;
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
            Tail_skret_8: 'Assets/Tail_Skret_Up_Right.png',
            fruit: 'Assets/fruit.png'
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


        for (let y = 0; y < this.Size; y++) {
            for (let x = 0; x < this.Size; x++) {
                if ((x + y) % 2 === 0) ctx.fillStyle = '#708090';  // slate gray
                else ctx.fillStyle = '#ADD8E6';                   // light blue
                ctx.fillRect(x * this.TileSize, y * this.TileSize, this.TileSize, this.TileSize);
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
                    this.TileSize,
                    this.TileSize
                );
            }
        }

        const Fruitimage = this.Images[this.Fruit.Image];
        if (Fruitimage) {
            ctx.drawImage(
                Fruitimage,
                this.Fruit.x * this.TileSize,
                this.Fruit.y * this.TileSize,
                this.TileSize,
                this.TileSize
            );
        }
    }

    async DrawGame(ctx) {
        while (!this.isGameEnded) {
            this.Snake.Move();
            this.Snake.ChangeAllImages();

            if (this.Snake.CheckHeadPosition(this.Size)) {
                if (this.Snake.CheckIfEatFruit(this.Fruit)) {
                    this.GenerateFruitCords();
                    this.Points += 50;
                    document.getElementById('Points').textContent = `${String(this.Points)}`;
                }
                this.Draw(ctx);
                await this.sleep(200);
            } else {
                this.isGameEnded = true;
                console.log("GameEnded");
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    GenerateFruitCords() {
        let TempX, TempY;
        let isOnSnake;

        do {
            TempX = Math.floor(Math.random() * this.Size);
            TempY = Math.floor(Math.random() * this.Size);

            isOnSnake = this.Snake.SnakeParts.some(part => part.x === TempX && part.y === TempY);

        } while (isOnSnake);

        this.Fruit.SetCords(TempX, TempY);
    }
}

export default Map;