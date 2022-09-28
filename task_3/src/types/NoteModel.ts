export const categories = ['Task', 'Idea', 'Random Thought'];

export enum EnumCategory {
    Task = 'Task',
    Idea = 'Idea',
    'Random Thought' = 'Random Thought',
}

export interface INoteModel {
    id: string;
    archived: boolean;
    title: string;
    description: string;
    dates?: string[];
    created?: string;
    category: string;
}

export interface ISummary {
    category: string;
    active: number;
    archived: number;
}

export interface INoteParams {
    category: string;
    archived: boolean;
}

export interface INoteFormShape {
    archived: boolean;
    title: string;
    description: string;
    category: string;
}

export interface INewNoteBackShape {
    archived: boolean;
    title: string;
    description: string;
    category: EnumCategory;
}

export interface INote extends INoteFormShape{
    id: string;
}
