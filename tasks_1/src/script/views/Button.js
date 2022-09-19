import { View } from './View.js';

export class Button extends View{
    constructor(parentElement) {
        super(parentElement);
    }

    _createElement() {
        this._element = document.createElement('div');
        this._element.classList.add('controls')
        this._element.innerHTML = `
            <i></i>
            <button class="button-move-active margin-control">
               Go to active notes
             </button>  
        `
    };
}
