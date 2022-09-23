import waait from 'waait';
import { notesTypes } from '../types';
import { NOTES } from '../../../data/config';
import { AppThunk } from '../init/store';
import { INoteModel, CategoryEnum, INoteParams } from '../../../types';
import { messageActions } from './message';
import { INoteFormShape } from '../../../components/forms/types';


export const notesActions = Object.freeze({
    startLoading: () => {
        return {
            type: notesTypes.START_LOADING,
        };
    },
    stopLoading: () => {
        return {
            type: notesTypes.STOP_LOADING,
        };
    },
    setNotes: (notes: INoteModel[]) => {
        return {
            type:    notesTypes.SET_NOTES,
            payload: notes,
        };
    },
    selectNote: (id: string | null) => {
        return {
            type:    notesTypes.SELECT_NOTE,
            payload: id,
        };
    },
    resetNote: (id: string) => {
        return {
            type:    notesTypes.RESET_NOTE,
            payload: id,
        };
    },
    resetNotes: (params: INoteParams) => {
        return {
            type:    notesTypes.RESET_NOTES,
            payload: params,
        };
    },
    createNote: (newNote: INoteFormShape) => {
        return {
            type:    notesTypes.CREATE_NONE,
            payload: newNote,
        };
    },
    updateNote: (newNote: INoteFormShape) => {
        return {
            type:    notesTypes.CREATE_NONE,
            payload: newNote,
        };
    },
    archiveNote: (id: string) => {
        return {
            type:    notesTypes.ARCHIVE_NOTE,
            payload: id,
        };
    },
    archiveNotes: (params: INoteParams) => {
        return {
            type:    notesTypes.ARCHIVE_NOTE,
            payload: params,
        };
    },
    showArchivedNotesByCategory(category: CategoryEnum) {
        return {
            type:    notesTypes.SHOW_ARCHIVED_BY_CATEGORY,
            payload: category,
        };
    },
    showActive() {
        return {
            type: notesTypes.SHOW_ACTIVE,
        };
    },
    setAllNotesAsync: (): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            dispatch(notesActions.setNotes([...NOTES]));

            await waait(1000);
        } catch (error) {
            const { message  } = error as Error;
            dispatch(messageActions.setMessage({
                message: message || 'Something went wrong',
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    addNoteAsync: (newNote: INoteFormShape): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            dispatch(notesActions.createNote(newNote));

            dispatch(messageActions.setMessage({
                message: `Note ${newNote?.title} was added`,
                type:    'success',
            }));

            await waait(1000);
        } catch (error) {
            const { message  } = error as Error;
            dispatch(messageActions.setMessage({
                message: message || 'Something went wrong',
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    updateNoteAsync: (newNote: INoteFormShape): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            if (!newNote?.id) {
                throw Error(`Note ${newNote.title} can not be updated(missing id)`);
            }

            dispatch(notesActions.updateNote(newNote));

            dispatch(messageActions.setMessage({
                message: `Note ${newNote.title} was updated.`,
                type:    'info',
            }));

            await waait(1000);
        } catch (error) {
            const { message  } = error as Error;
            dispatch(messageActions.setMessage({
                message: message || 'Something went wrong',
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    archiveNoteAsync: (id:string): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            dispatch(notesActions.archiveNote(id));

            dispatch(messageActions.setMessage({
                message: `Note ${id} was archived/unarchived`,
                type:    'info',
            }));

            await waait(1000);
        } catch (error) {
            const { message  } = error as Error;

            dispatch(messageActions.setMessage({
                message: message || 'Something went wrong',
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    archiveNotesAsync: (params: INoteParams): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            dispatch(notesActions.archiveNotes(params));

            dispatch(messageActions.setMessage({
                message: `${!params.archived ?  'All active notes were archived'
                    : `All archived note of category ${params.category} were unarchived`}`,
                type: 'info',
            }));

            await waait(1000);
        } catch (error) {
            const { message  } = error as Error;

            dispatch(messageActions.setMessage({
                message: message || 'Something went wrong',
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    deleteNoteAsync: (id:string): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            dispatch(notesActions.resetNote(id));

            dispatch(messageActions.setMessage({
                message: `Note ${id} was removed`,
                type:    'info',
            }));

            await waait(1000);
        } catch (error) {
            const { message  } = error as Error;

            dispatch(messageActions.setMessage({
                message: message || 'Something went wrong',
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    deleteNotesAsync: (params: INoteParams): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            dispatch(notesActions.resetNotes(params));

            dispatch(messageActions.setMessage({
                message: `${!params.archived ?  'All active notes were removed'
                    : `All archived note of category ${params.category} were removed`}`,
                type: 'info',
            }));

            await waait(1000);
        } catch (error) {
            const { message  } = error as Error;

            dispatch(messageActions.setMessage({
                message: message || 'Something went wrong',
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
});
