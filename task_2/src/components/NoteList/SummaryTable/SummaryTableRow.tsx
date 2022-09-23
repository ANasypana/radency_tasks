import { FC } from 'react';
import cn from 'classnames';

import { CategoryEnum, ISummary } from '../../../types';

interface IProps extends ISummary {
    clickHandler: () => void;
}

export const SummaryTableRow:FC<IProps> = (props) => {
    const {
        clickHandler, archived, active, category,
    } = props;

    const styles = cn({
        'button-category-task':    category === CategoryEnum.TASK,
        'button-category-idea':    category === CategoryEnum.IDEA,
        'button-category-thought': category === CategoryEnum.THOUGHT,
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
