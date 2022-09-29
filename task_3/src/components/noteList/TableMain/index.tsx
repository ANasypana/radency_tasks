import { FC } from 'react';
import cn from 'classnames';
import { MainTableRow } from './MainTableRow';
import { INoteModel } from '../../../types';


interface IProps {
    notes: INoteModel[];
    removeNone: (id: string) => () => void;
    removeNones: () => void;
    selectNote: (id: string) => () => void;
    archiveNote: (id: string) => () => void;
    archiveNotes: () => void;
}

export const MainTable:FC<IProps> = (props) => {
    const {
        notes, selectNote, archiveNote, removeNone, archiveNotes, removeNones,
    } = props;

    const { archived } = notes[ 0 ];

    const styleIcon = cn({
        'button-unarchive-notes': archived,
        'button-archive-notes':   !archived,
    });

    const dataJSX = notes?.map((n, index) => <MainTableRow
        key = { index }
        editHandler = { selectNote(n.id) }
        deleteHandler = { removeNone(n.id) }
        archiveHandler = { archiveNote(n.id) }
        { ...n } />);

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Category</th>
                    <th>Content</th>
                    <th>Dates</th>
                    <th>
                        <a
                            onClick = { archiveNotes }
                            className =  { styleIcon }></a>
                        <a
                            onClick = { removeNones }
                            className = 'button-remove-notes'></a>
                    </th>
                </tr>
            </thead>
            <tbody>{ dataJSX }</tbody>
        </table>
    );
};

