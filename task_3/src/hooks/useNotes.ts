import { useSelector } from 'react-redux';
import { getNotes } from '../lib/redux/selectors';
import { notesActions } from '../lib/redux/actions';
import { useAppDispatch } from '../lib/redux/init/store';


export const useNotes = () => {
    const dispatch = useAppDispatch();
    const {
        isLoading, selectedNote, showNotes, summary, active, notes
    } = useSelector(getNotes);

    const selectNote = (id: string) => () => dispatch(notesActions.getNoteAsync(id));

    const removeNone = (id: string) => () => dispatch(notesActions.deleteNoteAsync(id));


    const archiveNote = (id: string) => () => {
        const note = notes.find(n => n.id === id);
        if(note) {
            dispatch(notesActions.updateNoteAsync({
                id: note.id,
                description: note.description,
                title: note.title,
                archived: !note.archived,
                category: note.category,
            }));
        }
    };


    const switchToArchive = (category: string) => () => {
        dispatch(notesActions.showArchivedNotesByCategory(category));
    };

    const switchToActive = () => dispatch(notesActions.showActive());

    return {
        notes,
        showNotes,
        active,
        isLoading,
        summary,
        selectNote,
        removeNone,
        archiveNote,
        switchToArchive,
        switchToActive,
        isShowCard: !!selectedNote,
    };
};
