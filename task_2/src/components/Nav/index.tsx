// Core
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { book } from '../../navigation/book';


export const Navigation: FC = () => {
    return (
        <nav>
            <NavLink
                to = { book.notesManager  } >Notes</NavLink>
            <NavLink
                to = { book.profile } >Profile</NavLink>
        </nav>
    );
};
