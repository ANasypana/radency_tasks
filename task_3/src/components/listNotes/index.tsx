import { FC } from 'react';
import { ControlComponent } from '../control';
import { NotesComponent } from '../notes';

export const ListOfNotesComponent:FC = () => {

    return (
        <>
            <ControlComponent />
            <div className = 'wrap'>
                <div className= 'list empty'>
                    <NotesComponent />
                </div>

            </div>
        </>

    );
};
