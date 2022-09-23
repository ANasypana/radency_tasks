import { FC } from 'react';

import { useNotes } from '../../hooks';
import { TaskCard } from './TaskCard';
import { NotesList } from '../NoteList';


export const NotesManager:FC = () => {
    const { isLoading, isShowCard, selectNote } = useNotes();

    return (
        <main>
            <div className = 'controls'>
                <i className = 'las'></i>
                <button
                    onClick = { selectNote('') }
                    disabled = { isLoading }
                    className = 'button-create-note'>
                    New Note
                </button>
            </div>
            <div className = 'wrap'>
                <NotesList />
                { !isLoading && isShowCard && <TaskCard /> }
            </div>
        </main>
    );
};
