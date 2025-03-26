

class Field {
    constructor(row,col){
        this.Symbol = "";
        this.element = null;
        this.row = row;
        this.col = col;

        this.createElement();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('field');
        this.element.style.backgroundColor = '#ccc';
    }

    CheckNieghbour(other) {
        if (this.Symbol == other.Symbol) return true;
        return false;
    }

    SetValue(Symbol) {
        this.Symbol = Symbol;
        this.element.textContent = Symbol;
    }
}


export default Field;