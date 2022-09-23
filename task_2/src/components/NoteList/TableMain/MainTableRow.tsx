import { FC } from 'react';
import cn from 'classnames';
import { strToData } from '../../../utils/date';
import { CategoryEnum, INoteModel } from '../../../types';

interface IProps extends INoteModel {
    editHandler: () => void;
    deleteHandler: () => void;
    archiveHandler: () => void;
}

export const MainTableRow:FC<IProps> = (props) => {
    const {
        category, created, dates, description, title, archived, editHandler,
        archiveHandler, deleteHandler,
    } = props;

    const styleSpan = cn({
        'button-category-task':    category === CategoryEnum.TASK,
        'button-category-idea':    category === CategoryEnum.IDEA,
        'button-category-thought': category === CategoryEnum.THOUGHT,
    });

    const styleIcon = cn({
        'button-unarchive-notes': archived,
        'button-archive-notes':   !archived,
    });

    return (
        <tr >
            <td><span className = { styleSpan }></span></td>
            <td>{ title }</td>
            <td>{ strToData(created || '') }</td>
            <td>{ category }</td>
            <td>{ description }</td>
            <td>{ dates?.join(', ') }</td>
            <td>
                <a
                    onClick = { editHandler }
                    className = 'button-edit-notes'></a>
                <a
                    onClick = { archiveHandler }
                    className = { styleIcon }></a>
                <a
                    onClick = { deleteHandler }
                    className = 'button-remove-notes'></a>
            </td>
        </tr>
    );
};
