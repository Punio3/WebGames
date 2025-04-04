
class SnakePart {
    constructor(x,y,direction,image) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.Image = image;
    }

    ChangeImage(type,dirNext) {
        if (type === 0) {
            if (this.direction === 0) this.Image = "head_UP";
            else if (this.direction === 1) this.Image = "head_DOWN";
            else if (this.direction === 2) this.Image = "head_LEFT";
            else if (this.direction === 3) this.Image = "head_RIGHT";
        } else if (type === 1) {
            if (this.direction === 0 && dirNext === 2) this.Image = "body_skret_4";
            else if (this.direction === 0 && dirNext === 3) this.Image = "body_skret_2";
            else if (this.direction === 1 && dirNext === 2) this.Image = "body_skret_3";
            else if (this.direction === 1 && dirNext === 3) this.Image = "body_skret_1";
            else if (this.direction === 2 && dirNext === 0) this.Image = "body_skret_1";
            else if (this.direction === 2 && dirNext === 1) this.Image = "body_skret_2";
            else if (this.direction === 3 && dirNext === 0) this.Image = "body_skret_3";
            else if (this.direction === 3 && dirNext === 1) this.Image = "body_skret_4";
            else if (this.direction === 0 || this.direction == 1) this.Image = "Body_Col";
            else if (this.direction === 2 || this.direction == 3) this.Image = "Body_Row";
        } else if (type === 2) {
            if (this.direction === 0 && dirNext === 2) this.Image = "Tail_skret_4";
            else if (this.direction === 0 && dirNext === 3) this.Image = "Tail_skret_6";
            else if (this.direction === 1 && dirNext === 2) this.Image = "Tail_skret_3";
            else if (this.direction === 1 && dirNext === 3) this.Image = "Tail_skret_5";
            else if (this.direction === 2 && dirNext === 0) this.Image = "Tail_skret_7";
            else if (this.direction === 2 && dirNext === 1) this.Image = "Tail_skret_1";
            else if (this.direction === 3 && dirNext === 0) this.Image = "Tail_skret_8";
            else if (this.direction === 3 && dirNext === 1) this.Image = "Tail_skret_2";

            else if (this.direction === 0) this.Image = "tail_UP";
            else if (this.direction === 1) this.Image = "tail_DOWN";
            else if (this.direction === 2) this.Image = "tail_LEFT";
            else if (this.direction === 3) this.Image = "tail_RIGHT";
        }
    }
}

export default SnakePart;