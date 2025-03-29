
class Miss_Circles {
    constructor(index) {
        this.index = index;
        this.element = null;

        this.CreateElement();
    }

    CreateElement() {
        this.element = document.createElement('div');
        this.element.classList.add('Miss_Circles');
        this.element.dataset.index = this.index;

    }

    ShowCircle() {
        this.element.style.backgroundColor = "firebrick";
    }
}

export default Miss_Circles;