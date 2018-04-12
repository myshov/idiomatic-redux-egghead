import {createStore} from 'redux';
import throttle from 'lodash/throttle';

import rootReducer from './reducers';
import {loadState, saveState} from './localStorage';


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

const configureStore = () => {
    const persistedState = loadState();

    const todoStore = createStore(
        rootReducer,
        persistedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    todoStore.subscribe(throttle(() => {
        saveState({
            todos: todoStore.getState().todos
        });
    }, 1000));

    if (process.env.NODE_ENV !== 'production') {
        todoStore.dispatch = addLoggingToDispatch(todoStore);
    }

    return todoStore;
}

export default configureStore;
