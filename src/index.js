import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';
import TodoApp from './components/TodoApp';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import {loadState, saveState} from './localStorage';


const persistedState = loadState();

const todoStore = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

todoStore.subscribe(() => {
    saveState(todoStore.getState());
});

ReactDOM.render(
    <Provider store={todoStore}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
