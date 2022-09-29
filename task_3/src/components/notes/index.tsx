import { FC } from 'react';
import cn from 'classnames';
import { ToastContainer, Slide } from 'react-toastify';
import { ControlComponent } from '../control';
import { NotesList } from '../noteList';
import { NoteCard } from '../noteCard'
import { useNotes, useToastMessage } from '../../hooks';



export const ListOfNotesComponent:FC = () => {
    useToastMessage();
    const { isLoading, isShowCard, notes } = useNotes();
    const styles = cn('list', { empty: notes.length === 0 });

    return (
        <>
            <ControlComponent />
            <div className = 'wrap'>
                <ToastContainer newestOnTop transition = { Slide } />
                <div className = { styles }>
                    <NotesList />
                </div>
                { !isLoading && isShowCard && <NoteCard /> }
            </div>
        </>

    );
};
