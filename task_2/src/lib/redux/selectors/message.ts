import { RootState } from '../init/store';
import { IMessage } from '../../../types';

export const getMessage = (state: RootState): IMessage => {
    return state.message.message;
};
