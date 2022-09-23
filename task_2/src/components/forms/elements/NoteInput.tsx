import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IPropsTypes {
    placeholder?: string;
    type?: string;
    lang?: string;
    tag?: string;
    label?: string;
    name?: string;
    value?: string;
    register?: UseFormRegisterReturn;
}

export const NoteInput: FC<IPropsTypes> = (props) => {
    const {
        register, type, tag, placeholder, label,
    } = props;


    let input = (
        <input
            className = { register?.name }
            placeholder = { placeholder }
            type = { type }
            { ...register } />
    );

    if (tag === 'textarea') {
        input = (
            <textarea
                className = 'text'
                placeholder = { placeholder }
                { ...register }>
            </textarea>
        );
    }

    return (
        <label className = 'label'>
            { label }
            { input }
        </label>
    );
};

NoteInput.defaultProps = {
    type: 'text',
    tag:  'input',
};
