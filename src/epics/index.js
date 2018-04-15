import {combineEpics} from 'redux-observable';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as api from '../api';
import {getIsFetching} from '../reducers';
import {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    toggleTodoSuccess,
    addTodoSuccess,
} from '../actions';

// epics
const fetchTodosEpic = (action$, store) =>
    action$
        .ofType('FETCH_TODOS')
        .mergeMap(action => {
            const {filter} = action;

            if (getIsFetching(store.getState(), filter)) {
                return Observable.of({type: 'interrupt'});
            }

            return Observable
                .concat(
                    Observable.of(fetchTodosRequest(action.filter)),
                    Observable
                        .fromPromise(api.fetchTodos(filter))
                        .map(response => fetchTodosSuccess(filter, response))
                        .catch(error => Observable.of(fetchTodosFailure(filter, error)))
                )
        });

const toggleTodoEpic = action$ =>
    action$
        .ofType('TOGGLE_TODO')
        .mergeMap(action =>
            Observable
                .fromPromise(api.toggleTodo(action.id))
                .map(response => toggleTodoSuccess(response))
        );

const addTodoEpic = action$ =>
    action$
        .ofType('ADD_TODO')
        .mergeMap(action =>
            Observable
                .fromPromise(api.addTodo(action.text))
                .map(response => addTodoSuccess(response))
        );

const rootEpic = combineEpics(
    fetchTodosEpic,
    toggleTodoEpic,
    addTodoEpic,
);

export default rootEpic;
