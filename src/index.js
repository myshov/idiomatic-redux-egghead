import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';
import TodoApp from './components/TodoApp';
import registerServiceWorker from './registerServiceWorker';
import todosApp from './reducers';


const todoStore = createStore( todosApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={todoStore}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
