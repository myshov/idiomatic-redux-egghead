import {createStore} from 'redux';
import throttle from 'lodash/throttle';

import rootReducer from './reducers';
import {loadState, saveState} from './localStorage';


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

    return todoStore;
}

export default configureStore;
