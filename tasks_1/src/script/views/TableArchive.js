import { View } from './View.js';

export class TableArchive extends View{
    constructor(parentElement) {
        super(parentElement);
    }

    _createElement() {
        this._element = document.createElement('table');
        this._element.innerHTML = `
        <thead>
           <tr>
               <th></th>
               <th>Name Category</th>
               <th>Active</th>
               <th>Archived</th>               
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
                <td>${d?.category}</td>
                <td>${d?.active}</td>
                <td>${d?.archived}</td>           
            `;

            if(d?.category) {
                tr.dataset.category = d.category;
            }
            fragment.appendChild(tr);
        });
        tbody.append(fragment);
        this._element.append(tbody);
    }
}
