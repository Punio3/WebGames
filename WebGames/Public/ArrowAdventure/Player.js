
class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.direction = 0;
        this.Image = "walk1";
        this.Images = {};

        this.loadImages();
    }

    loadImages() {
        this.Images["walk1"] = new Image();
        this.Images["walk1"].src = 'images/Hero/HeroIdle/hero-idle-back.png';

        this.Images["walk2"] = new Image();
        this.Images["walk2"].src = 'images/Hero/HeroIdle/hero-idle-front.png';

        this.Images["walk3"] = new Image();
        this.Images["walk3"].src = 'images/Hero/HeroIdle/hero-idle-side.png';

        this.Images["walk4"] = new Image();
        this.Images["walk4"].src = 'images/Hero/HeroIdle/hero-idle-side2.png';
    }

    SetDirection(direction) {
        if (direction === 0) this.y--;
        else if (direction === 1) this.y++;
        else if (direction === 2) this.x++;
        else if (direction === 3) this.x--;

        this.direction = direction;
        this.ChangeImage();
    }

    ChangeImage() {
        if (this.direction === 0) this.Image = "walk1";
        else if (this.direction === 1) this.Image = "walk2";
        else if (this.direction === 2) this.Image = "walk3";
        else if (this.direction === 3) this.Image = "walk4";
    }

    DrawPlayer(camera, ctx) {
        const img = this.Images[this.Image];
        if (img.complete) {
            ctx.drawImage(img, (this.x - camera.x) * 40, (this.y - camera.y) * 40, 40, 40);
        }
    }
}


export default Player;