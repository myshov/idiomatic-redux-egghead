import {createStore} from 'redux';

import rootReducer from './reducers';


const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
}

const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    return (action) => {
        if (action instanceof Promise) {
            return action.then(rawDispatch);
        } else {
            return rawDispatch(action);
        }
    }
}

const configureStore = () => {
    const todoStore = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    if (process.env.NODE_ENV !== 'production') {
        todoStore.dispatch = addLoggingToDispatch(todoStore);
    }

    todoStore.dispatch = addPromiseSupportToDispatch(todoStore);

    return todoStore;
}

export default configureStore;
