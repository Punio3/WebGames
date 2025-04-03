import Animal from './Animal.js';

class Rabbit extends Animal {

    constructor(x, y) {
        super(x, y,"rabbit"); 

        this.loadImages();
    }

    loadImages() {
        this.Images["rabbit"] = new Image();
        this.Images["rabbit"].src = '../ArrowAdventure/images/rabbit.png';
    }

    move(mapSize) {
        const randomDx = Math.floor(Math.random() * 2) ;
        const randomDy = Math.floor(Math.random() * 2) ;
        console.log("Królik skacze losowo!");
        super.move(randomDx, randomDy, mapSize);
    }
}

export default Rabbit;