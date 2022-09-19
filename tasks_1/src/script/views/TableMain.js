import { View } from './View.js';
import { dateFormat, extractDates } from '../helpers.js';

export class TableMain  extends View{
    constructor(parentElement) {
        super(parentElement);
        this.active = true;
        this.category = '';
    }

    _createElement() {
        this.active = !this._data[0]?.archived;
        if(!this.active) {
            this.category = this._data[0]?.category;
        }
        this._element = document.createElement('table');
        this._element.innerHTML = `
        <thead>
           <tr>
               <th></th>
               <th>Name</th>
               <th>Created</th>
               <th>Category</th>
               <th>Content</th>
               <th>Dates</th>
               <th>
                    ${this._data[0]?.archived ? 
                        '<a class="button-unarchive-notes"></a>' : '<a class="button-archive-notes"></a>'}
                    <a class="button-remove-notes"></a>
               </th>
           </tr>
        </thead>
        `
    };

    _generateMarkup() {
        const tbody = document.createElement('tbody');
        const fragment = document.createDocumentFragment();
        this._data.forEach(d => {
            const tr = document.createElement('tr');
            const span = d?.category === 'Task' ?
                '<span class="button-category-task">' :
                (d?.category === 'Idea' ? '<span class="button-category-idea">' : '<span class="button-category-thought">');

            tr.innerHTML = `
                <td>${span}</td>                
                <td class="width-16">${d?.title}</td>
                <td class="width-16">${dateFormat(d?.created)}</td>
                <td class="width-16">${d?.category}</td>
                <td class="width-16">${d?.description}</td>
                <td class="width-16">
                    ${d?.dates.join(', ')}                   
                </td>
                <td class="width-16">
                    <a class="button-edit-notes"></a>
                    ${d.archived ? '<a class="button-unarchive-notes"></a>' : '<a class="button-archive-notes"></a>'} 
                    <a class="button-remove-notes"></a>
                </td>                                
            `;

            if(d?.id) {
               tr.dataset.id = d.id;
            }
            fragment.appendChild(tr);
        });
        tbody.append(fragment);
        this._element.append(tbody);
    }
}
