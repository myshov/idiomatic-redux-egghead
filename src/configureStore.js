import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const configureStore = () => {
    const middlewares = [epicMiddleware];
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
