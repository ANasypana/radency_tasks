import { NOTES } from './config.js';
import { TableMain, Form, TableArchive, Button } from './views/index.js';
import { Model } from './model.js';
import * as controllers from './controllers.js';

const init = () => {
    const tableContainer = document.querySelector('.notes');
    const formContainer = document.querySelector('.note-card');
    const btnNewNote = document.querySelector('.button-create-note');

    const model = new Model([...NOTES]);
    const mainTable = new TableMain(tableContainer);
    const archiveTable = new TableArchive(tableContainer);
    const btnSwitchTable = new Button(tableContainer);
    const form = new Form(formContainer);

    const newNote = {
        title: '',
        description: '',
        category: '',
    };
    btnNewNote.addEventListener('click', event => {
        controllers.buildForm(form, model, mainTable, archiveTable)({ ...newNote });
    });

    controllers.renderTables(model, mainTable, archiveTable, btnSwitchTable);

    tableContainer.addEventListener('click', controllers.tablesHandler(
        model, mainTable, archiveTable, btnSwitchTable, controllers.buildForm(form, model, mainTable, archiveTable)));

};


init();





