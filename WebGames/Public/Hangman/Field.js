class Field {
    constructor(index, letter, type) {
        this.index = index;
        this.letter = letter;
        this.element = null;
        this.type = type;

        this.createElement();
    }

    createElement() {
        this.element = document.createElement('div');
        if (this.type === 0) this.element.classList.add('field');
        else if (this.type === 1) this.element.classList.add('field2');
        this.element.dataset.index = this.index;

        if (this.letter === ' ') this.Hide();
    }

    SetLetter(value) {
        this.letter = value;
    }

    ShowLetter() {
        if (this.letter !== ' ') this.element.textContent = this.letter;
        else this.element.style.border = 0;

        if (this.type === 0) this.element.style.backgroundColor = ' #ddd';
    }

    Hide() {
        this.element.classList.add('hidden-field');
    }

}

export default Field;