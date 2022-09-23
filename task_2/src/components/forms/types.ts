export interface INoteFormShape {
    archived: boolean;
    title: string;
    description: string;
    category: string;
}

export interface INote extends INoteFormShape{
    id: string;
}
