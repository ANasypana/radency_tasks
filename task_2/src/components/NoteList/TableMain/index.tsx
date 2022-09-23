import { FC } from 'react';
import cn from 'classnames';
import { MainTableRow } from './MainTableRow';
import { INoteModel, INoteParams } from '../../../types';


interface IProps {
    notes: INoteModel[];
    removeNone: (id: string) => () => void;
    selectNote: (id: string) => () => void;
    archiveNote: (id: string) => () => void;
    removeNotes: (params: INoteParams) => () => void;
    archiveNotes: (params: INoteParams) => () => void;
}

export const MainTable:FC<IProps> = (props) => {
    const {
        notes, selectNote, archiveNotes, archiveNote, removeNotes, removeNone,
    } = props;
    const category = notes[ 0 ].archived ? notes[ 0 ].category : null;
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
                            onClick = { archiveNotes({ archived, category }) }
                            className =  { styleIcon }></a>
                        <a
                            onClick = { removeNotes({ archived, category }) }
                            className = 'button-remove-notes'></a>
                    </th>
                </tr>
            </thead>
            <tbody>{ dataJSX }</tbody>
        </table>
    );
};

