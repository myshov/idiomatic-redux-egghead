import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers';


const configureStore = () => {
    const middlewares = [promise];
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
