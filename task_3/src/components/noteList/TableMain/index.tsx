import { FC } from 'react';
import cn from 'classnames';
import { MainTableRow } from './MainTableRow';
import { INoteModel } from '../../../types';


interface IProps {
    notes: INoteModel[];
    removeNone: (id: string) => () => void;
    selectNote: (id: string) => () => void;
    archiveNote: (id: string) => () => void;
}

export const MainTable:FC<IProps> = (props) => {
    const {
        notes, selectNote, archiveNote, removeNone,
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
                        <a className =  { styleIcon }></a>
                        <a className = 'button-remove-notes'></a>
                    </th>
                </tr>
            </thead>
            <tbody>{ dataJSX }</tbody>
        </table>
    );
};

