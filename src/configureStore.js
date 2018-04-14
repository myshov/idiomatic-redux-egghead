import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers';

const thunk = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch);
    }

    return next(action);
}

const configureStore = () => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    const todoStore = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
        /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
    );

    return todoStore;
}

export default configureStore;
