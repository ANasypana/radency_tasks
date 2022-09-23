// Core
import { combineReducers } from 'redux';

// Reducers
import {
    messageReducer as message,
    notesReducer as notes,
} from '../reducers';


export const rootReducer = combineReducers({
    message,
    notes,
});
