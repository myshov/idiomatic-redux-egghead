import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore} from 'redux';
import todosApp from './reducers';

const {Component} = React;
const todoStore = createStore(
    todosApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration:
                completed ?
                    'line-through' :
                    'none'
        }}
    >
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick = {() => onTodoClick(todo.id)}
            />
        )}
    </ul>
)

const FilterLink = ({filter, currentFilter, children}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>;
    }

    return (
        <a
            href = '#'
            onClick = {e => {
                e.preventDefault();
                todoStore.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                });
            }}
        >
            {children}
        </a>
    )
};

const AddTodo = ({
    onAddClick
}) => {
    let input;
    return (
        <div>
            <input ref={(node) => {
                input = node;
            }} />
            <button onClick={() => {
                onAddClick(input.value);
                input.value = '';
            }}>
                Add todo
            </button>
        </div>
    )
}

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
}

let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        const {
            todos,
            visibilityFilter
        } = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
        return (
            <div>
                <AddTodo
                    onAddClick = {(value) => {
                        todoStore.dispatch({
                            type: 'ADD_TODO',
                            text: value,
                            id: nextTodoId++
                        });
                    }}
                />
                <TodoList
                    todos = {visibleTodos}
                    onTodoClick = {(id) => {
                        todoStore.dispatch({
                            type: 'TOGGLE_TODO',
                            id: id
                        })
                    }}
                />
                <p>
                    Show:
                    {' '}
                    <FilterLink
                        filter = 'SHOW_ALL'
                        currentFilter = {visibilityFilter}
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter = 'SHOW_ACTIVE'
                        currentFilter = {visibilityFilter}
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter = 'SHOW_COMPLETED'
                        currentFilter = {visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        )
    }
}
const render = () => {
    ReactDOM.render(
        <TodoApp {...todoStore.getState()}/>,
        document.getElementById('root')
    );
}

todoStore.subscribe(render)
render();

registerServiceWorker();
