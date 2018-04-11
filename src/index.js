import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

const todoStore = configureStore();

ReactDOM.render(
    <Root store={todoStore} />,
    document.getElementById('root')
);

registerServiceWorker();
