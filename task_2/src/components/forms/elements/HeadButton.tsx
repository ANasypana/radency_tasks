import { FC, MouseEvent } from 'react';
import {
    UseFormRegisterReturn, Control, Controller, FieldValues,
} from 'react-hook-form';

interface IPropsTypes {
    register: UseFormRegisterReturn;
    control: Control<FieldValues>;
    isFetching: boolean;
}

export const HeadButton:FC<IPropsTypes> = (props) => {
    const { control, register, isFetching } = props;

    return (
        <Controller
            control = { control }
            name = { register.name || '' }
            render = { ({ field }) => (
                <button
                    onClick = { (event: MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        field.onBlur();
                        field.onChange(!field.value);
                    }  }
                    disabled = { isFetching }
                    className =
                        { `${field.value ? 'button-archive-note archived' : 'button-archive-note'}` }>
                    Archived
                </button>
            )
            }  />
    );
};
