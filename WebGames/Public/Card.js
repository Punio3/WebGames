
class Card {
    constructor(color, index) {
        this.color = color;
        this.index = index;
        this.flipped = false;
        this.element = null;

        this.createElement();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('card');
        this.element.dataset.index = this.index;
        this.element.style.backgroundColor = '#ccc';
    }

    flipCard() {
        if (this.flipped) return;
        this.flipped = true;
        this.element.style.backgroundColor = this.color;
    }

    hideCard() {
        this.flipped = false;
        this.element.style.backgroundColor = '#ccc';
    }
}

export default Card;