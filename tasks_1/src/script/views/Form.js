import { View } from './View.js';

export class Form extends View{
    constructor(parentElement) {
        super(parentElement);
        this._handlerTag = this._handlerTagClick.bind(this);
        this._close = this.remove.bind(this);
        this._change = this._handledChange.bind(this);
    }

    _createElement() {
        this._element = document.createElement('form');
        this._element.innerHTML = `
        <form>
            <div class="head">
              <div class="button-remove-task"></div>
            </div>
        </form>
        `
    };

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
        const taskClass = this._data.category === 'Task' ? 'tag task selected' : 'tag task';
        const ideaClass = this._data.category === 'Idea' ? 'tag idea selected' : 'tag idea';
        const thoughtClass = this._data.category === 'Random Thought' ? 'tag thought selected' : 'tag thought';

        fieldset.innerHTML = `
        <div class="content">
                <label class="label">
                  Задачи
                  <input class="title" placeholder="Add Title" type="text" name="title" value=${this._data.title}>
                </label>

              <div class="description">
                <label class="label">Описание
                  <textarea class="text" placeholder="Add description" name="description" value=${this._data.description}></textarea>
                </label>
              </div>
                <div class="tags">
                  <span class=${taskClass}>
                    Task
                  </span>
                  <span class=${ideaClass}>
                    Idea
                  </span>
                  <span class=${thoughtClass}>
                    Random Thought
                  </span>
                </div>
                <div class="errors">                  
                </div>
                <div class="form-controls">               
                    <button class="button-save-task" type="submit">
                      Save
                    </button>
                    ${!!this._data.id ? '<button className="button-archive">${textArchive}</button>' : ''}                    
                </div>
              </div>`;

        this._element.append(fieldset);
    }

    _handlerTagClick(event){
        if(this._errorsContainer.innerHTML){
            this._errorsContainer = '';
        }

        const selectedTag = this._element.querySelector('.selected');
        if(selectedTag.innerHTML !== event.target.innerHTML){
            selectedTag.classList.remove('selected')
        }
        event.classList.toggle('selected');
    }

    addSubmitForm(handler){
        this.submit = this._handlerSubmit(handler).bind(this);
        this._element.addEventListener('submit', this.submit);

    }

    addArchiveNote(handler){
        this.btnArchive = this._element.querySelector('.button-archive');
        this._archive = this._handlerArchive(handler).bind(this);
        this._archive.addEventListener('click', this._archive);
    }


    _handlerArchive = (handler) => (event) => {
        handler(this._data.id);
        this.remove();
    }

    _handlerSubmit = (handler) => (event) =>{
        event.preventDefault();
        const tag = this._element.querySelector('.tag.selected');
        let validate = true;

        if(event.target?.elements?.title?.length){
            this.addErrorMessage('Title should be added');
            validate = false;
        }

        if(event.target?.elements?.description?.length){
            this.addErrorMessage('Description should be added');
            validate = false;
        }

        if(!!tag){
            this.addErrorMessage('Please, choose category');
            validate = false;
        }

        if(validate) {
            handler({
                title: event.target?.elements?.title,
                description: event.target?.elements?.description,
                category: tag.innerHTML.trim(),
            });
            this.remove();
        }
    }

    _handledChange(){
        this._errorsContainer.innerHTML = '';
    }

    _addListeners(){
        this._tags = this._element.querySelectorAll('.tag');
        this._btnClose = this._element.querySelectorAll('.button-remove-task');
        this._errorsContainer = this._element.querySelector('.errors');
        this._title = this._element.querySelector('.title');
        this._description = this._element.querySelector('.text');
        this._tags.forEach(n => n.addEventListener('click', this._handlerTag));
        this._btnClose._addListeners('click', this._close);
        this._title.addEventListener('change', this._change);
        this._description.addEventListener('change', this._change);



    }

    _removeListeners(){
        this._tags.forEach(n => n.removeEventListener('click', this._handlerTag));
        this._btnClose._removeListeners('click', this._close);
        this._element.removeEventListener('submit', this.submit);
        this._archive.removeEventListener('click', this._archive);
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
        if(!this._parentElement.classList.contains('empty')) {
            this._parentElement.classList.add('empty')
        }
    }
}
