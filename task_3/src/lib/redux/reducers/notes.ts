import { AnyAction } from 'redux';
import { notesTypes } from '../types';
import { INoteModel, ISummary } from '../../../types';


const setActive = (arr: INoteModel[]) => arr.filter((n) => !n.archived);

const setArchivedByCategory = (category: string, arr: INoteModel[]) => {
    return arr.filter((n) => n.category === category && n.archived);
};

export interface IInitialState {
    notes: INoteModel[];
    selectedNote: null | INoteModel;
    isLoading: boolean;
    showNotes: INoteModel[];
    active: INoteModel[];
    summary: ISummary[];
}

const initialState: IInitialState = {
    notes:        new Array<INoteModel>(),
    selectedNote: null,
    isLoading:    false,
    showNotes:    new Array<INoteModel>(),
    summary:      new Array<ISummary>(),
    active:       new Array<INoteModel>(),
};

export const newNote = {
    id:          '',
    archived:    false,
    title:       '',
    description: '',
    category:    '',
};

export const notesReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case notesTypes.START_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case notesTypes.STOP_LOADING: {
            return {
                ...state,
                isLoading: false,
            };
        }

        case notesTypes.SET_NOTES: {
            return {
                ...state,
                notes:     [...payload],
                showNotes: setActive(payload),
                active:    setActive(payload),
            };
        }

        case notesTypes.SET_SUMMARY: {
            return {
                ...state,
                summary: payload,
            };
        }

        case notesTypes.SELECT_NOTE: {
            return {
                ...state,
                selectedNote: payload,
            };
        }

        case notesTypes.SHOW_ARCHIVED_BY_CATEGORY: {
            return {
                ...state,
                showNotes: setArchivedByCategory(payload, state.notes),
            };
        }

        case notesTypes.SHOW_ACTIVE: {
            return {
                ...state,
                showNotes: setActive(state.notes),
            };
        }

        default: {
            return state;
        }
    }
};
