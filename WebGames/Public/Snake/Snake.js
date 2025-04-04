import SnakePart from './SnakePart.js';

class Snake {
    constructor(size) {
        this.SnakeParts = []
        this.direction = 0;

        this.SnakeParts.push(new SnakePart(Math.floor(size/2), Math.floor(size/2), 0, "head"));
    }

    CheckHeadPosition(Size) {
        if (this.SnakeParts[0].x < 0 || this.SnakeParts[0].x >= Size || this.SnakeParts[0].y < 0 || this.SnakeParts[0].y >= Size) return false;
        for (let i = 1; i < this.SnakeParts.length; i++) {
            if (this.SnakeParts[0].x === this.SnakeParts[i].x && this.SnakeParts[0].y === this.SnakeParts[i].y) return false;
        }
        return true;
    }

    ChangeDirection() {
        if (this.direction === 0 && this.SnakeParts[0].direction !== 1) this.SnakeParts[0].direction = this.direction;
        if (this.direction === 1 && this.SnakeParts[0].direction !== 0) this.SnakeParts[0].direction = this.direction;
        if (this.direction === 2 && this.SnakeParts[0].direction !== 3) this.SnakeParts[0].direction = this.direction;
        if (this.direction === 3 && this.SnakeParts[0].direction !== 2) this.SnakeParts[0].direction = this.direction;
    }

    Move() {
        for (let i = this.SnakeParts.length - 1; i > 0; i--) {
            this.SnakeParts[i].x = this.SnakeParts[i - 1].x;
            this.SnakeParts[i].y = this.SnakeParts[i - 1].y;
            this.SnakeParts[i].direction = this.SnakeParts[i - 1].direction;
        }

        this.ChangeDirection();

        if (this.SnakeParts[0].direction === 0) this.SnakeParts[0].y--;
        if (this.SnakeParts[0].direction === 1) this.SnakeParts[0].y++;
        if (this.SnakeParts[0].direction === 2) this.SnakeParts[0].x--;
        if (this.SnakeParts[0].direction === 3) this.SnakeParts[0].x++;
    }

    CheckIfEatFruit(fruit) {
        if (this.SnakeParts[0].x === fruit.x && this.SnakeParts[0].y === fruit.y) {
            const last = this.SnakeParts[this.SnakeParts.length - 1];
            this.SnakeParts.push(new SnakePart(last.x, last.y, last.direction, "xd")); 
            return true;
        }
        return false;
    }
}

export default Snake;