import { RootState } from '../init/store';
import { INoteModel } from '../../../types';
import { IInitialState } from '../reducers/notes';

export const getSelectedNote = (state: RootState): INoteModel | null => {
    return state.notes.selectedNote;
};


export const getNotes = (state: RootState): IInitialState => {
    return state.notes;
};
