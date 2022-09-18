export const renderTables = (
    model, tableMain, tableArchive, list, button = null, active = true, category = ''
) => {
    const actives = model.dataActive;
    const archives = model.extractArchiveByCategory();
    const categoryArchive = model.getArchivedByCategory(category);
    tableMain.clear();

    if(actives.length === 0 && archives.length === 0 && !list.classList.contains('empty')) {
        list.classList.add('empty')
    }

    if(actives.length > 0 && active) {
        tableMain.render(actives)
    }

    if(categoryArchive.length > 0 && !active) {
        tableMain.render(categoryArchive);
        button.render()
    }

    if(archives.length > 0) {
        tableArchive.render(archives)
    }
}

export const tablesHandler = (model, tableMain, tableArchive, button) => (event) => {
    const list = event.target.closest('.list');

    if(event.target.classList.contains('button-edit-notes')) {
        const id = event.target.closest('tr').dataset.id;
        if(id) {
            const data = model.getNote(id);
            openFormHandler(data);
        }
    }

    if(event.target.classList.contains('button-archive-notes')) {
        if(event.target.closest('td')) {
            const id = event.target.closest('tr').dataset.id;
            if(id){
                model.archiveNote(id);
                renderTables(model, tableMain, tableArchive, list);

            }
        }

        if(event.target.closest('th')) {
            model.archiveAll();
            renderTables(model, tableMain, tableArchive, list, button, true);
        }
    }

    if(event.target.classList.contains('button-unarchive-notes')) {
        if(event.target.closest('td')) {
            const id = event.target.closest('tr').dataset.id;
            if(id){
                model.archiveNote(id);
                renderTables(model, tableMain, tableArchive, list, button, tableMain.active, tableMain.category);

            }
        }

        if(event.target.closest('th')) {
            model.unArchiveAll(tableMain.category);
            renderTables(model, tableMain, tableArchive, list, button, true);
        }
    }

    if(event.target.classList.contains('button-remove-notes')) {
        if(event.target.closest('td')) {
            const id = event.target.closest('tr').dataset.id;
            if(id){
                model.deleteNote(id);
                renderTables(model, tableMain, tableArchive, list, button, tableMain.active, tableMain.category);

            }
        }

        if(event.target.closest('th')) {
            model.deleteAll(tableMain.active, tableMain.category);
            renderTables(model, tableMain, tableArchive, list, button, tableMain.active, tableMain.category);
        }

    }

    if(event.target.classList.contains('button-move-active')) {
        const actives = model.dataActive;
        const archives = model.extractArchiveByCategory();
        tableMain.clear();

        if(actives.length === 0 && archives.length === 0 && !list.classList.contains('empty')) {
            list.classList.add('empty')
        }

        if(actives.length) {
            tableMain.render(actives)
        }

        if(archives.length > 0) {
            tableArchive.render(archives)
        }

    }

    if(!!event.target.dataset.category || !!event.target.parentElement?.dataset.category) {
        const category = event.target.dataset.category || event.target.parentElement?.dataset.category;
        const archives = model.extractArchiveByCategory();
        const categoryArchive = model.getArchivedByCategory(category);
        tableMain.clear();

        if(archives.length === 0 && categoryArchive.length === 0 && !list.classList.contains('empty')) {
            list.classList.add('empty')
        }

        if(categoryArchive.length) {
            tableMain.render(categoryArchive);
            button.render();
        }

        if(archives.length > 0) {
            tableArchive.render(archives)
        }

    }

};

export const openFormHandler = (data) => {

}


