import { extractDates } from './helpers.js';

export class Model {
    _data;
    constructor(arr) {
        this._data = [...arr];
    }

    get dataActive() {
        const activeNotes = this._data.filter(note => !note.archived);
        return [...activeNotes];
    }

    get dataArchived() {
        const archivedNotes = this._data.filter(note => note.archived);
        return [...archivedNotes];
    }

    getArchivedByCategory(category) {
        const archivedNotes = this._data.filter(note => note.archived && note.category === category);
        return [...archivedNotes];
    }

    deleteNote(id) {
        const newData = this._data.filter(note => note.id !== id)
        this._data = [...newData];
    }

    getNote(id) {
        return this._data.find(note => note.id === id);
    }

    addNote(newNote) {
        this._data.push({
            ...newNote,
            id: (Date.now() + this._data.length).toString(),
            created: new Date(),
            dates: extractDates(newNote.description),
            archived: false,
        })
    }

    editNote(id, editNote) {
        const newNotes = this._data.map(note => {
            if(note.id === id) {
                return {...note, ...editNote, dates: extractDates(editNote.description)};
            }
            return {...note};
        });
        this._data = [...newNotes];
    }

    archiveNote(id) {
        const newNotes = this._data.map(note => {
            if(note.id === id) {
                return { ...note, archived: !note.archived };
            }
            return note;
        });

        this._data = [...newNotes];
    }

    archiveAll() {
        const newData = this._data.map(note => {
            if(!note.archived) {
                return { ...note, archived: !note.archived }
            }

            return { ...note }
        });
        this._data = [...newData];
    }


    unArchiveAll(category) {
        const newData = this._data.map(note => {
            if(note.archived && note.category === category) {
                return { ...note, archived: !note.archived }
            }

            return { ...note }
        });
        this._data = [...newData];
    }

    deleteAll(active = true, category = '') {
        if(active) {
            const newData = this._data.filter(note => note.archived);
            this._data = [...newData];
        }else {
            const newData = this._data.filter(note => !note.archived && note.category === category);
            this._data = [...newData];
        }
    }

   extractArchiveByCategory(){
        const archived = this._data.filter(node => node.archived);
        const data = [];
        archived.forEach(elm => {
            if(data.filter(e => e.category === elm.category).length === 0) {
                const note = {};
                note.category = elm.category;
                note.active = this._data.filter(e => e.category === elm.category && !e.archived).length;
                note.archived = this._data.filter(e => e.category === elm.category && e.archived).length;
                data.push({...note});
            }
        });

        return data;
   }
}

