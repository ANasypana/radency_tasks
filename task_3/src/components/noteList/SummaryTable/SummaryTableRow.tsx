import { FC } from 'react';
import cn from 'classnames';

import { ISummary } from '../../../types';

interface IProps extends ISummary {
    clickHandler: () => void;
}

export const SummaryTableRow:FC<IProps> = (props) => {
    const {
        clickHandler, archived, active, category,
    } = props;

    const styles = cn({
        'button-category-task':    category === 'Task',
        'button-category-idea':    category === 'Idea',
        'button-category-thought': category === 'Random Thought',
    });

    return (
        <tr
            className = 'summary-row'
            onClick = { clickHandler } >
            <td><span className = { styles }></span></td>
            <td>{ category }</td>
            <td>{ active }</td>
            <td>{ archived }</td>
        </tr>
    );
};
