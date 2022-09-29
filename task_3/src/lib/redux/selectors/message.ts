import { AppState} from '../init/rootReducer';
import { IMessage } from '../../../types';

export const getMessage = (state: AppState): IMessage => {
    return state.message.message;
};
