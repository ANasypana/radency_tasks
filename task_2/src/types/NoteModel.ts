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
