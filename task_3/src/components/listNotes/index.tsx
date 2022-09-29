import { FC } from 'react';
import cn from 'classnames';
import { ControlComponent } from '../control';
import { NotesList } from '../noteList';
import { useNotes } from '../../hooks';


export const ListOfNotesComponent:FC = () => {
    const { isLoading, isShowCard, notes } = useNotes();
    const styles = cn('list', { empty: notes.length === 0 });

    return (
        <>
            <ControlComponent />
            <div className = 'wrap'>
                <div className = { styles }>
                    <NotesList />
                </div>
            </div>
        </>

    );
};
