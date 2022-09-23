export type ToastTheme = 'error' | 'success' | 'info' | 'warn';

export interface IMessage {
    message: string;
    type: ToastTheme;
}
