
class Fruit {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    GenerateRandomCords(size) {
        this.x = Math.floor(Math.random() * size);
        this.y = Math.floor(Math.random() * size);
    }
}

export default Fruit;