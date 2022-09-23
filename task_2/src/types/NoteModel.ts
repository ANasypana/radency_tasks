export enum CategoryEnum {
    TASK = 'Task',
    IDEA = 'Idea',
    THOUGHT = 'Random Thought',
}

export interface INoteModel {
    id: string;
    archived: boolean;
    title: string;
    description: string;
    dates?: string[];
    created?: string;
    category: CategoryEnum | null;
}

export interface ISummary {
    category: CategoryEnum;
    active: number;
    archived: number;
}

export interface INoteParams {
    category: CategoryEnum | null;
    archived: boolean;
}
