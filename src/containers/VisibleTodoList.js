import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {toggleTodo} from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(t => t.completed);
        case 'active':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
}

const mapStateToTodoListProps = (state, {match}) => ({
    todos: getVisibleTodos(
        state.todos,
        match.params.filter
    )
});

const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id))
    }
});

export default withRouter(connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList));
