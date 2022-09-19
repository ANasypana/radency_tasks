import { View } from './View.js';

export class Form extends View{
    constructor(parentElement) {
        super(parentElement);
        this._handlerTag = this._handlerTagClick.bind(this);
        this._close = this._closeHandler.bind(this);
        this._change = this._handledChange.bind(this);
    }

    _createElement() {
        this._element = document.createElement('form');
        this._element.innerHTML = `            
            <div class="head">
              <div class="button-remove-task"></div>
            </div>`;
    }

    addErrorMessage(message) {
        const p = document.createElement('p');
        p.classList.add('errorMessage');
        p.innerHTML = message;
        this._errorsContainer.append(p);
    }

    _generateMarkup() {
        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('fieldset');
        const textArchive = this._data.archived ? 'Move from archive' : 'Move to archive';

        fieldset.innerHTML = `
              <div class="content">
                <label class="label">
                  Задачи
                  <input class="title" placeholder="Add Title" type="text" name="title" value="${this._data.title}">
                </label>
                <div class="description">
                <label class="label">Описание
                  <textarea class="text" 
                  placeholder="Add description" 
                  name="description" >${this._data.description}</textarea>
                </label>
              </div>              
              <div class="tags">
                    ${this._data.category === 'Task' ? 
                        '<span class="tag task selected">Task</span>' : '<span class="tag task">Task</span>'}
                    ${this._data.category === 'Idea' ?
                        '<span class="tag idea selected">Idea</span>' : '<span class="tag idea">Idea</span>'}
                    ${this._data.category === 'Random Thought' ?
                        '<span class="tag thought selected">Random Thought</span>' : 
                            '<span class="tag thought">Random Thought</span>'}                  
              </div>
                <div class="errors">                  
                </div>
                <div class="form-controls">               
                    <button class="button-save-task" type="submit">
                      Save
                    </button>                    
                    <button class="button-archive">${textArchive}</button>                                  
                </div>
              </div>`;

        this._element.append(fieldset);
    }

    _closeHandler(){
        this.remove();
    }

    _handlerTagClick(event){
        if(!!this._errorsContainer?.innerHTML){
            this._errorsContainer.innerHTML = '';
        }

        const selectedTag = this._element.querySelector('.selected');

        if(selectedTag?.innerHTML.trim() !== event.target?.innerHTML.trim()){
            selectedTag?.classList.remove('selected')
        }
        event.target.classList.toggle('selected');
    }

    addSubmitForm(handler){
        this.submit = this._handlerSubmit(handler).bind(this);
        this._element.addEventListener('submit', this.submit);
    }

    addArchiveNote(handler){
        this.btnArchive = this._element.querySelector('.button-archive');
        if(!this._data.id) {
            this.btnArchive.disabled = true;
        }
        this._archive = this._handlerArchive(handler).bind(this);
        this.btnArchive.addEventListener('click', this._archive);
    }

    _handlerArchive = (handler) => (event) => {
        handler(this._data.id);
        this.remove();
    }

    _handlerSubmit = (handler) => (event) =>{
        event.preventDefault();
        const tag = this._element.querySelector('.tag.selected');
        let validate = true;

        if(!event.target?.elements.title.value.trim()){
            this.addErrorMessage('Title should be added');
            validate = false;
        }

        if(!event.target?.elements?.description.value.trim()){
            this.addErrorMessage('Description should be added');
            validate = false;
        }

        if(!tag){
            this.addErrorMessage('Please, choose category');
            validate = false;
        }

        if(validate) {
            handler({
                title: event.target?.elements?.title.value.trim(),
                description: event.target?.elements?.description.value.trim(),
                category: tag.innerHTML.trim(),
                id: this._data?.id
            });
            this.remove();
        }
    }

    _handledChange(){
        this._errorsContainer.innerHTML = '';
    }

    _addListeners(){
        this._tags = this._element.querySelectorAll('.tag');
        this._btnClose = this._element.querySelector('.button-remove-task');
        this._errorsContainer = this._element.querySelector('.errors');
        this._title = this._element.querySelector('.title');
        this._description = this._element.querySelector('.text');
        this._tags.forEach(n => n.addEventListener('click', this._handlerTag));
        this._btnClose.addEventListener('click', this._close);
        this._title.addEventListener('change', this._change);
        this._description.addEventListener('change', this._change);
    }

    _removeListeners(){
        this._tags.forEach(n => n.removeEventListener('click', this._handlerTag));
        this._btnClose.removeEventListener('click', this._close);
        this._element.removeEventListener('submit', this.submit);
        this.btnArchive.removeEventListener('click', this._archive);
        this._title.removeEventListener('change', this._change);
        this._description.removeEventListener('change', this._change);

    }

    render(data) {
        super.render(data);
        this._addListeners();
    }

    remove(){
        this._removeListeners();
        this.clear();
        if(!this.parentElement.classList.contains('empty')) {
            this.parentElement.classList.add('empty')
        }
    }
}
