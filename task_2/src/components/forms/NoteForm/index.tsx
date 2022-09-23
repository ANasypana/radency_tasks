// Core
import { FC, useEffect } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Other
import {
    NoteInput, CategoriesList, HeadButton,
} from '../elements';
import { useManageNote } from '../../../hooks';
import { schema } from './config';
import { INoteFormShape } from '../types';


const titlePlacholder = 'Add Title';
const descPlacholder = 'Add Description';

export const NoteForm: FC = () => {
    const {
        isLoading, selectedNote, removeNote, handlerNoteSubmit, restData, closeCard,
    } = useManageNote();

    const formConfig: UseFormProps = {
        mode:          'onTouched',
        resolver:      yupResolver(schema),
        defaultValues: {
            archived:    selectedNote?.archived || false,
            title:       selectedNote?.title || '',
            description: selectedNote?.description || '',
            category:    selectedNote?.category || '',
        },
    };

    const {
        handleSubmit, control, register, setValue, reset, clearErrors,
        formState: { isValid, touchedFields, errors },
    } = useForm(formConfig);

    // When choose new note, fields of form don`t update  in form. So useEffeect was used
    useEffect(() => {
        setValue('archived', selectedNote?.archived || false);
        setValue('title', selectedNote?.title || '');
        setValue('description', selectedNote?.description || '');
        setValue('category', selectedNote?.category || '');
    }, [selectedNote]);

    const isHide = touchedFields?.title || touchedFields?.description || touchedFields?.archived
    || touchedFields.category;

    const onSubmit = handleSubmit(async (data: INoteFormShape) => {
        if (isValid) {
            await handlerNoteSubmit(data);
        }
    });

    return (
        <form onSubmit = { onSubmit }>
            <div className = 'head'>
                <div>
                    {
                        !!selectedNote?.id
                        && <HeadButton
                            register = { register('archived') }
                            control = { control }
                            isFetching = { isLoading } />
                    }
                </div>
                <div
                    onClick = { closeCard }
                    className = 'button-close-note'></div>
            </div>
            <fieldset className = 'fieldset' disabled = { isLoading }>
                <div className = 'content'>
                    <NoteInput
                        label = 'Note title'
                        placeholder = { titlePlacholder }
                        register = { register('title') } />
                    <div className = 'description'>
                        <NoteInput
                            label = 'Note description'
                            tag = 'textarea'
                            placeholder = { descPlacholder }
                            register = { register('description') } />
                    </div>
                    <CategoriesList
                        control = { control }
                        register = { register('category') } />
                    <div className = 'errors'>
                        <p className = 'errorMessage'> { errors?.title?.message }</p>
                        <p className = 'errorMessage'> { errors?.description?.message }</p>
                        <p className = 'errorMessage'> { errors?.category?.message }</p>
                    </div>
                    <div className = 'form-controls'>
                        <button
                            disabled = { !isHide }
                            onClick = { restData(reset, clearErrors) }
                            type = 'reset'
                            className = 'button-reset-task' >
                            Reset
                        </button>
                        <button
                            className = 'button-save-task'
                            disabled = { !isHide }
                            type = 'submit' >
                            Save
                        </button>
                        { !!selectedNote?.id
                            && <div className = 'wrapper-close'>
                                <button
                                    onClick = { removeNote }
                                    className = 'button-remove-note' >
                                    Delete Note
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </fieldset>
        </form>
    );
};
