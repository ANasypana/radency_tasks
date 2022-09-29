import { InitializeStore, TDispatch} from '../init/store';



export const serverDispatch = async (store: InitializeStore, execute: (dipatch: TDispatch) => void) => {
    const { dispatch } = store;

    execute(dispatch);
};
