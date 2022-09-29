import { FC } from 'react';

interface IProps {
    clickHandler: () => void;
}

export const ButtonSwitch:FC<IProps> = (props) => {
    const { clickHandler } = props;

    return (
        <div className = 'controls'>
            <i></i>
            <button
                onClick = { clickHandler }
                className = 'button-move-active margin-control'>
                Go to active notes
            </button>
        </div>
    );
};
