import axios, { AxiosResponse, AxiosError } from 'axios';
import { notesTypes } from '../types';
import { AppThunk } from '../init/store';
import { INoteModel, INote, INoteFormShape, ISummary, IErrorResponse } from '../../../types';
import { messageActions } from './message';

let path = '';

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
    selectNote: (note: INoteModel | null) => {
        return {
            type:    notesTypes.SELECT_NOTE,
            payload: note,
        };
    },
    setSummary: (notes: ISummary[]) => {
        return {
            type:    notesTypes.SET_SUMMARY,
            payload: notes,
        };
    },
    showArchivedNotesByCategory(category: string) {
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
    getNotesAsync: (url=''): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            if(!!url){
                path = url;
            }

            const notes = await axios.get<INoteModel[]>(    `${path}/api/notes`);

            if(notes?.data){
                dispatch(notesActions.setNotes(notes.data));
            }

            const summary = await axios.get<ISummary[]>(`${path}/api/notes/stats`);

            if(summary?.data){
                dispatch(notesActions.setSummary(summary.data));
            }

        } catch (error) {
            const { response }  = error as AxiosError<IErrorResponse>;
            const message = response?.data?.message || 'Something went wrong';
            dispatch(messageActions.setMessage({
                message: message,
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    getNoteAsync: (id: string): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());
            const note = await axios.get<INoteModel>(`${path}/api/notes/${id}`);

            if(note?.data){
                dispatch(notesActions.selectNote(note.data));
            }

        } catch (error) {
            const { response }  = error as AxiosError<IErrorResponse>;
            const message = response?.data?.message || 'Something went wrong';
            dispatch(messageActions.setMessage({
                message: message,
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }

    },
    addNoteAsync: (newNote: INoteFormShape): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            await axios.post<INoteModel>(`${path}/api/notes`, newNote);

            dispatch(messageActions.setMessage({
                message: `Note ${newNote?.title} was created`,
                type:    'success',
            }));

            const notes = await axios.get<INoteModel[]>(`${path}/api/notes`);

            if(notes?.data){
                dispatch(notesActions.setNotes(notes.data));
            }

            const summary = await axios.get<ISummary[]>(`${path}/api/notes/stats`);

            if(summary?.data){
                dispatch(notesActions.setSummary(summary.data));
            }
        } catch (error) {
            const { response }  = error as AxiosError<IErrorResponse>;
            const message = response?.data?.message || 'Something went wrong';
            dispatch(messageActions.setMessage({
                message: message,
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    updateNoteAsync: (newNote: INote): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());

            await axios.patch<INoteModel>(`${path}/api/notes/${newNote.id}`, newNote);



            const notes = await axios.get<INoteModel[]>(`${path}/api/notes`);

            if(notes?.data){
                dispatch(notesActions.setNotes(notes.data));
            }

            const summary = await axios.get<ISummary[]>(`${path}/api/notes/stats`);

            if(summary?.data){
                dispatch(notesActions.setSummary(summary.data));
            }

            dispatch(messageActions.setMessage({
                message: `Note ${newNote.title} was updated.`,
                type:    'info',
            }));

        } catch (error) {
            const { response }  = error as AxiosError<IErrorResponse>;
            const message = response?.data?.message || 'Something went wrong';
            dispatch(messageActions.setMessage({
                message: message,
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
    deleteNoteAsync: (id:string): AppThunk => async (dispatch) => {
        try {
            dispatch(notesActions.startLoading());
            await axios.delete(`${path}/api/notes/${id}`);

            const notes = await axios.get<INoteModel[]>(`${path}/api/notes`);

            if(notes?.data){
                dispatch(notesActions.setNotes(notes.data));
            }

            const summary = await axios.get<ISummary[]>(`${path}/api/notes/stats`);

            if(summary?.data){
                dispatch(notesActions.setSummary(summary.data));
            }

            dispatch(messageActions.setMessage({
                message: `Note ${id} was deleted`,
                type:    'info',
            }));

        } catch (error) {
            const { response }  = error as AxiosError<IErrorResponse>;
            const message = response?.data?.message || 'Something went wrong';
            dispatch(messageActions.setMessage({
                message: message,
                type:    'error',
            }));
        } finally {
            dispatch(notesActions.stopLoading());
        }
    },
});
