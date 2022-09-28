import * as yup from 'yup';
import { INewNoteBackShape, EnumCategory } from '../types';


export const schema: yup.SchemaOf<INewNoteBackShape> = yup.object().shape({
    archived: yup
        .boolean()
        .required(),
    title: yup
        .string()
        .min(3)
        .max(64)
        .required(),
    description: yup
        .string()
        .min(3)
        .max(250)
        .required(),
    category: yup
        .mixed<EnumCategory>().oneOf(Object.values(EnumCategory))
        .required(),
});

