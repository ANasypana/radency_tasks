export class View {
    _data;
    _element;
    parentElement;

    constructor(parentElement) {
        this.parentElement = parentElement;

    }

    _createElement() {
        this._element = document.createElement('div');
    }

    _generateMarkup() {

    }

    clear() {
        this.parentElement.innerHTML = '';
    }

    render(data){
        this._data = data;
        this._createElement();
        this._generateMarkup();
        this.parentElement.append(this._element);
    }
}
