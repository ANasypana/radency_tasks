// Core
import { useSelector } from 'react-redux';

// Other
import { INoteFormShape } from '../components/forms/types';
import { useAppDispatch } from '../lib/redux/init/store';
import { notesActions } from '../lib/redux/actions';
import { getNotes } from '../lib/redux/selectors';


export const useManageNote = () => {
    const dispatch = useAppDispatch();

    const { isLoading, selectedNote } = useSelector(getNotes);

    const handlerNoteSubmit = (data: INoteFormShape) => {
        if (selectedNote?.id) {
            dispatch(notesActions.updateNoteAsync({ ...data, id: selectedNote.id }));
        } else {
            dispatch(notesActions.addNoteAsync(data));
        }
        dispatch(notesActions.selectNote(null));
    };

    const removeNote = () => {
        if (selectedNote?.id) {
            dispatch(notesActions.deleteNoteAsync(selectedNote.id));
        }
    };

    const restData = (reset: () => void, clear: () => void) => () => {
        if (selectedNote?.id) {
            reset();
        } else {
            dispatch(notesActions.selectNote(''));
        }
        clear();
    };

    const closeCard = () => dispatch(notesActions.selectNote(null));

    return {
        selectedNote,
        isLoading,
        handlerNoteSubmit,
        restData,
        closeCard,
        removeNote,
    };
};
