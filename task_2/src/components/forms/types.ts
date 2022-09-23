import { CategoryEnum } from '../../types/NoteModel';

export interface INoteFormShape {
    archived: boolean;
    title: string;
    description: string;
    category: CategoryEnum;
    id?: string;
}
