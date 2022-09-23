// Core
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Instruments
import { rootReducer } from './rootReducer';
import {
    composeEnhancers,
    middleware,
} from './middleware';

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type Action = { type: string; payload: unknown; error?: boolean };
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type TDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type AppDispatch = TDispatch;
