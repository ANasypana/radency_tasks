import { FC } from 'react';
import {
    UseFormRegisterReturn, Controller, Control, FieldValues,
} from 'react-hook-form';

import { categories } from '../../../../../types/NoteModel';
import { TagElement } from './TagElement';


interface IPropsTypes {
    register: UseFormRegisterReturn;
    control: Control<FieldValues>;
}

export const CategoriesList: FC<IPropsTypes> = (props) => {
    const { register, control } = props;

    return (
        <Controller
            control = { control }
            name = { register?.name || '' }
            render = { ({ field }) => {
                const categoriesJSX = categories?.map((category, index) => <TagElement
                    setCategory = { (name: string) => {
                        field.onBlur();
                        field.onChange(name);
                    } }
                    selectedCategory = { field.value }
                    name = { category }
                    key = { `${index}${category}` } />);

                return (
                    <div className = 'tags'>
                        { categoriesJSX }
                    </div>
                );
            } } />
    );
};
