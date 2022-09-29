import { AppState } from '../init/rootReducer';
import { INoteModel } from '../../../types';
import { IInitialState } from '../reducers/notes';

export const getSelectedNote = (state: AppState): INoteModel | null => {
    return state.notes.selectedNote;
};


export const getNotes = (state: AppState): IInitialState => {
    return state.notes;
};
