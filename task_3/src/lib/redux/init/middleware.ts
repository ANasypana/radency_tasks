// Core
import {AnyAction, applyMiddleware, Middleware, compose } from 'redux';
// eslint-disable import/no-extraneous-dependencies, node/no-unpublished-import
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
/*import { serverReduxLogger } from '../halpers/serverReduxLogger';*/


export const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title: (action: AnyAction) => {
            return action.error ? 'firebrick' : 'deepskyblue';
        },
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

const middleware: Middleware[] = [thunk];

const bindMiddleware = (middlewares: Middleware[]) => {
    if(process.env.NODE_ENV === 'development' && typeof window !== 'undefined'){
        middlewares.push(logger);
    }else if (typeof window === 'undefined'){
       /*middlewares.push(serverReduxLogger)*/
    }

    return composeWithDevTools(applyMiddleware(...middlewares));
};

export { middleware, bindMiddleware };
