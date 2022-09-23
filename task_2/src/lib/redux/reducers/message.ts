import { AnyAction } from 'redux';
import { messageTypes } from '../types';
import { IMessage } from '../../../types';

interface IInitialState {
    message: IMessage;
}

export const initialState: IInitialState = {
    message: {
        message: '',
        type:    'info',
    },
};

export const messageReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case messageTypes.SET_MESSAGE: {
            return {
                ...state,
                message: { ...payload },
            };
        }

        case messageTypes.RESET_MESSAGE: {
            return {
                ...state,
                message: {
                    message: '',
                    type:    'info',
                },
            };
        }

        default: {
            return state;
        }
    }
};
