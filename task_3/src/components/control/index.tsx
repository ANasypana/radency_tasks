import { FC } from 'react';
import { useNotes } from '../../hooks'

export const ControlComponent:FC = () => {
    const { openCard } = useNotes();

    return (
        <div className = 'controls'>
            <button
                onClick = { openCard }
                className = 'button-create-note'>
                New Note
            </button>
        </div>
    );
};
