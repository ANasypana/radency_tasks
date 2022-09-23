import { FC } from 'react';
import { SummaryTableRow } from './SummaryTableRow';
import { ISummary } from '../../../types';

interface IProps {
    summary: ISummary[];
    showArchives: (category: string) => () => void;
}

export const SummaryTable:FC<IProps> = (props) => {
    const { summary, showArchives } = props;
    const dataJSX = summary?.map((d, index) => <SummaryTableRow
        key = { index }
        clickHandler = { showArchives(d.category) }
        { ...d } />);

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Name Category</th>
                    <th>Active</th>
                    <th>Archived</th>
                </tr>
            </thead>
            <tbody>{ dataJSX }</tbody>
        </table>
    );
};

