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

const Link = ({
    active,
    children,
    onClick
}) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a
            href = '#'
            onClick = {e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    )
};

class FilterLink extends Component {
    componentDidMount() {
        this.unsubscribe = todoStore.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = todoStore.getState();

        return (
            <Link
                active = {
                    props.filter === state.visibilityFilter
                }
                onClick = {() => {
                    todoStore.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    });
                }}
            >
                {props.children}
            </Link>
        );
    }
}

const AddTodo = () => {
    let input;
    return (
        <div>
            <input ref={(node) => {
                input = node;
            }} />
            <button onClick={() => {
                todoStore.dispatch({
                    type: 'ADD_TODO',
                    text: input.value,
                    id: nextTodoId++
                });
                input.value = '';
            }}>
                Add todo
            </button>
        </div>
    )
}

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink
            filter = 'SHOW_ALL'
        >
            All
        </FilterLink>
        {' '}
        <FilterLink
            filter = 'SHOW_ACTIVE'
        >
            Active
        </FilterLink>
        {' '}
        <FilterLink
            filter = 'SHOW_COMPLETED'
        >
            Completed
        </FilterLink>
    </p>
)

class VisibleTodoList extends Component {
    componentDidMount() {
        this.unsubscribe = todoStore.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const state = todoStore.getState();

        return (
            <TodoList
                todos = {
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick = {(id) => {
                    todoStore.dispatch({
                        type: 'TOGGLE_TODO',
                        id: id
                    })
                }}
            />
        )
    }
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
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
);

registerServiceWorker();
