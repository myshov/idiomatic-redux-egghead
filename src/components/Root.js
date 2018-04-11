import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import TodoApp from './TodoApp';

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route path='/:filter?' component={TodoApp} />
                    <Redirect from="/" to="/all"/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default Root;
