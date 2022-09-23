import { AnyAction } from 'redux';
import { notesTypes } from '../types';
import { INoteModel, ISummary } from '../../../types';
import { extractDates } from '../../../utils/date';

const buildSummary = (arr: INoteModel[]) => {
    const resArr = new Array<ISummary>();
    const archived = arr.filter((n) => n.archived);
    archived.forEach((n) => {
        if (!!n.category
            && resArr.filter((elm) => elm.category === n.category).length === 0) {
            resArr.push({
                category: n.category,
                active:   arr.filter((elm) => !elm.archived && elm.category === n.category).length,
                archived: arr.filter((elm) => elm.archived && elm.category === n.category).length,
            });
        }
    });

    return resArr;
};

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
                summary:   buildSummary(payload),
                active:    setActive(payload),
            };
        }

        case notesTypes.SELECT_NOTE: {
            if (payload === null) {
                return {
                    ...state,
                    selectedNote: null,
                };
            }
            if (payload) {
                const note = state.notes.find((n) => n.id === payload);

                return {
                    ...state,
                    selectedNote: note || null,
                };
            }

            return {
                ...state,
                selectedNote: newNote,
            };
        }

        case notesTypes.RESET_NOTE: {
            const deletedNote = state.notes.find((n) => n.id === payload);
            const newNotes = state.notes.filter((n) => n.id !== payload);
            if (deletedNote) {
                return {
                    ...state,
                    notes:     [...newNotes],
                    summary:   buildSummary(newNotes),
                    active:    setActive(newNotes),
                    showNotes: deletedNote.archived
                        ? setArchivedByCategory(deletedNote.category, newNotes)
                        : setActive(newNotes),
                };
            }

            return {
                ...state,
            };
        }

        case notesTypes.RESET_NOTES: {
            const newNotes = payload.archived
                ? state.notes
                    .filter((n) => !(n.category === payload.category && n.archived))
                : state.notes.filter((n) => n.archived);

            return {
                ...state,
                notes:     [...newNotes],
                summary:   buildSummary(newNotes),
                active:    setActive(newNotes),
                showNotes: payload.archived ? setActive(newNotes) : new Array<INoteModel>(),
            };
        }

        case notesTypes.ARCHIVE_NOTE: {
            const selectNote = state.notes.find((n) => n.id === payload);
            const newNotes = state.notes.map((n) => {
                if (n.id === payload) {
                    return {
                        ...n,
                        archived: !n.archived,
                    };
                }

                return { ...n };
            });

            if (selectNote) {
                return {
                    ...state,
                    notes:     [...newNotes],
                    summary:   buildSummary(newNotes),
                    active:    setActive(newNotes),
                    showNotes: selectNote.archived
                        ? setArchivedByCategory(selectNote.category, newNotes)
                        : setActive(newNotes),
                };
            }

            return {
                ...state,
            };
        }

        case notesTypes.ARCHIVE_NOTES: {
            const newNotes = state.notes.map((n) => {
                if (payload.archived && n.category === payload.category) {
                    return {
                        ...n,
                        archived: !n.archived,
                    };
                }
                if (!payload.archived && !n.archived) {
                    return {
                        ...n,
                        archived: !n.archived,
                    };
                }

                return {
                    ...n,
                };
            });

            return {
                ...state,
                notes:     [...newNotes],
                summary:   buildSummary(newNotes),
                active:    setActive(newNotes),
                showNotes: payload.archived ? setActive(newNotes) : new Array<INoteModel>(),
            };
        }

        case notesTypes.CREATE_NONE: {
            const newNotes = [...state.notes];
            newNotes.push({
                ...payload,
                id:      (state.notes.length + Date.now()).toString(),
                created: new Date().toString(),
                dates:   extractDates(payload.description),
            });

            return {
                ...state,
                notes:     [...newNotes],
                summary:   buildSummary(newNotes),
                active:    setActive(newNotes),
                showNotes: setActive(newNotes),
            };
        }

        case notesTypes.UPDATE_NOTE: {
            const editNote = state.notes.find((n) => n.id === payload.id);
            if (editNote) {
                const newNotes = state.notes.map((n) => {
                    if (n.id === editNote.id) {
                        return {
                            ...n,
                            ...payload,
                            dates: extractDates(payload.description),
                        };
                    }

                    return {
                        ...n,
                    };
                });

                return {
                    ...state,
                    notes:     [...newNotes],
                    summary:   buildSummary(newNotes),
                    active:    setActive(newNotes),
                    showNotes: editNote.archived
                        ? setArchivedByCategory(editNote.category, newNotes)
                        : setActive(newNotes),
                };
            }

            return {
                ...state,
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
