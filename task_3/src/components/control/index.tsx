import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const ControlComponent:FC = () => {

    return (
        <div className = 'controls'>
            <button
                onClick = { () => console.log('Click') }
                className = 'button-create-note'>
                New Note
            </button>
        </div>
    );
};
