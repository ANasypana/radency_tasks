import { messageTypes } from '../types';
import { IMessage } from '../../../types';


export const messageActions = Object.freeze({
    setMessage: (message: IMessage) => {
        return {
            type:    messageTypes.SET_MESSAGE,
            payload: message,
        };
    },
    resetMessage: () => {
        return {
            type: messageTypes.RESET_MESSAGE,
        };
    },
});
