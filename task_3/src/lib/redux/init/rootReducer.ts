// Core
import { combineReducers } from 'redux';

// Reducers
import {
    messageReducer as message,
    notesReducer as notes,
} from '../reducers';

export type AppState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    message,
    notes,
});
