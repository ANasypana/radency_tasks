import { FC, ReactNode } from 'react';

interface IProps {
    header: ReactNode;
    content: ReactNode | ReactNode[];
}

export const AppView:FC<IProps> = ({
    header,
    content,
}) => (
    <>
        { header }
        <main>
            { content }
        </main>
    </>
);
