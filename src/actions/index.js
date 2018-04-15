import {normalize} from 'normalizr';

import * as schema from './schema';


// action creators for views
export const fetchTodos = filter => ({
    type: 'FETCH_TODOS',
    filter,
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id,
});

export const addTodo = text => ({
    type: 'ADD_TODO',
    text,
});

// action creators for epics
export const fetchTodosRequest = filter => ({
    type: 'FETCH_TODOS_REQUEST',
    filter,
});

export const fetchTodosSuccess = (filter, response) =>({
    type: 'FETCH_TODOS_SUCCESS',
    response: normalize(response, schema.arrayOfTodos),
    filter,
});

export const fetchTodosFailure = (filter, error) => ({
    type: 'FETCH_TODOS_FAILURE',
    message: error.message,
    filter,
});

export const toggleTodoSuccess = response => ({
    type: 'TOGGLE_TODO_SUCCESS',
    response: normalize(response, schema.todo),
});

export const addTodoSuccess = response => ({
    type: 'ADD_TODO_SUCCESS',
    response: normalize(response, schema.todo),
});
