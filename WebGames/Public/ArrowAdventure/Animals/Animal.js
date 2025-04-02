class Animal {
    constructor(x, y,image) {
        if (new.target === Animal) {
            throw new Error("Nie mo¿na tworzyæ instancji klasy abstrakcyjnej");
        }
        this.x = x;
        this.y = y;
        this.Image = image;
    }

    move(dx, dy, mapSize) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (newX >= 0 && newX < mapSize && newY >= 0 && newY < mapSize) {
            this.x = newX;
            this.y = newY;
            console.log(`Zwierzê poruszy³o siê do (${this.x}, ${this.y})`);
        } else {
            console.log("Ruch poza mapê jest niemo¿liwy!");
        }
    }
}

export default Animal;