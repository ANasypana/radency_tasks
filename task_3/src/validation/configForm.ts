import * as yup from 'yup';
import { INoteFormShape } from '../types';

// eslint-disable-next-line no-template-curly-in-string
const tooShortMessage = 'Min length - ${min} symbols';
// eslint-disable-next-line no-template-curly-in-string
const tooLongMessage = 'Max length - ${max} symbols';
const categoryMessage = 'Please, choose category';

export const schema: yup.SchemaOf<INoteFormShape> = yup.object().shape({
    archived: yup
        .boolean()
        .required('*'),
    title: yup
        .string()
        .min(3, `Title: ${tooShortMessage}`)
        .max(64, `Title: ${tooLongMessage}`)
        .required('*'),
    description: yup
        .string()
        .min(3, `Description: ${tooShortMessage}`)
        .max(250, `Description: ${tooLongMessage}`)
        .required('*'),
    category: yup
        .string()
        .required(categoryMessage),
});
