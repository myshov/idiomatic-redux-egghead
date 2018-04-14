import {v4} from 'uuid';
import * as api from '../api';

import {getIsFetching} from '../reducers';


export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter,
});

const receiveTodos = (response, filter) => ({
    type: 'RECEIVE_TODOS',
    response,
    filter,
});

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }

    dispatch(requestTodos(filter));

    return api.fetchTodos(filter).then((response) => {
        dispatch(receiveTodos(response, filter));
    });
};
