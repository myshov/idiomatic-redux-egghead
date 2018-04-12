import {createStore} from 'redux';

import rootReducer from './reducers';


const logger = (store) => {
    return (next) => {
        if (!console.group) {
            return next;
        }

        return (action) => {
            console.group(action.type);
            console.log('%c prev state', 'color: gray', store.getState());
            console.log('%c action', 'color: blue', action);
            const returnValue = next(action);
            console.log('%c next state', 'color: green', store.getState());
            console.groupEnd(action.type);
            return returnValue;
        }
    }
}

const promiseMiddleware = (store) => (next) => (action) => {
    if (action instanceof Promise) {
        return action.then(next);
    } else {
        return next(action);
    }
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach((middleware) => {
        store.dispatch = middleware(store)(store.dispatch);
    });
}

const configureStore = () => {
    const todoStore = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    const middlewares = [promiseMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    wrapDispatchWithMiddlewares(todoStore, middlewares);

    return todoStore;
}

export default configureStore;
