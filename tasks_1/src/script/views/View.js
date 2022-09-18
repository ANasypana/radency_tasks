export class View {
    _data;
    _element;
    _parentElement;

    constructor(parentElement) {
        this._parentElement = parentElement;

    }

    _createElement() {
        this._element = document.createElement('div');
    }

    _generateMarkup() {

    }

    clear() {
        this._parentElement.innerHTML = '';
    }

    render(data){
        this._data = data;
        this._createElement();
        this._generateMarkup();
        this._parentElement.append(this._element);
    }
}
