// Core
import { useMemo } from 'react';
import {createStore, AnyAction, Store } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


// Instruments
import { rootReducer, AppState } from './rootReducer';
import {
    bindMiddleware,
    middleware,
} from './middleware';

let store: Store | undefined;

export const initStore = (preloadedState?: AppState): Store<AppState, AnyAction> => {
    const defaultState = preloadedState ? createStore(rootReducer)?.getState() : {};
    const currentState = {
        ...defaultState,
        ...preloadedState,
    };

    const store = createStore(rootReducer, currentState, bindMiddleware(middleware));

    return store;
};

export const initializeStore = (prelodedState?: AppState) => {
    let initializedStore = store ?? initStore(prelodedState);

    if(prelodedState && store){
        initializedStore = initStore({
            ...store.getState(),
            ...prelodedState,
        });
        store = undefined;
    }

    if(typeof window === 'undefined') {
        return initializedStore;
    }

    if(!store) {
        store = initializedStore;
    }

    return initializedStore;
};

export const useStore = (initialState?: AppState) => {
    return useMemo(() => initializeStore(initialState), [initialState]);
};

/*export type RootState = ReturnType<typeof store.getState>;*/
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export type Action = { type: string; payload: unknown; error?: boolean };
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
export type TDispatch = ThunkDispatch<AppState, void, AnyAction>;
export type AppDispatch = TDispatch;
export type InitializeStore = ReturnType<typeof initializeStore>;
