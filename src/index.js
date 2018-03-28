import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Provider, connect} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore} from 'redux';
import todosApp from './reducers';

const {Component} = React;

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
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const {store} = this.context;
        const state = store.getState();

        return (
            <Link
                active = {
                    props.filter === state.visibilityFilter
                }
                onClick = {() => {
                    store.dispatch({
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

FilterLink.contextTypes = {
    store: PropTypes.object
};

const AddTodo = (props, {store}) => {
    let input;
    return (
        <div>
            <input ref={(node) => {
                input = node;
            }} />
            <button onClick={() => {
                store.dispatch({
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
AddTodo.contextTypes = {
    store: PropTypes.object
};

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
);

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: id => {
            dispatch({
                type: 'TOGGLE_TODO',
                id: id
            })
        }
    };
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

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
