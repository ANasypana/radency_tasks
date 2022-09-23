// Core
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getNotes } from '../lib/redux/selectors';
import { notesActions } from '../lib/redux/actions';
import { useAppDispatch } from '../lib/redux/init/store';
import { INoteParams } from '../types';


export const useNotes = () => {
    const dispatch = useAppDispatch();
    const {
        isLoading, selectedNote, showNotes, summary, active,
    } = useSelector(getNotes);

    const selectNote = (id: string) => () => dispatch(notesActions.selectNote(id));

    const removeNone = (id: string) => () => dispatch(notesActions.deleteNoteAsync(id));

    const removeNotes = (params: INoteParams) => () => {
        dispatch(notesActions.deleteNotesAsync(params));
    };
    const archiveNote = (id: string) => () => {
        dispatch(notesActions.archiveNoteAsync(id));
    };
    const archiveNotes = (params: INoteParams) => () => {
        dispatch(notesActions.archiveNotesAsync(params));
    };

    const switchToArchive = (category: string) => () => {
        dispatch(notesActions.showArchivedNotesByCategory(category));
    };

    const switchToActive = () => dispatch(notesActions.showActive());

    useEffect(() => {
        dispatch(notesActions.setAllNotesAsync());
    }, []);

    return {
        showNotes,
        active,
        isLoading,
        summary,
        selectNote,
        removeNone,
        removeNotes,
        archiveNote,
        archiveNotes,
        switchToArchive,
        switchToActive,
        isShowCard: !!selectedNote,
    };
};
