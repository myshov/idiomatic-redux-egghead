import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {toggleTodo} from '../actions';
import TodoList from '../components/TodoList';
import {getVisibleTodos} from '../reducers';

const mapStateToProps = (state, {match}) => ({
    todos: getVisibleTodos(
        state,
        match.params.filter
    )
});

export default withRouter(connect(
    mapStateToProps,
    {onTodoClick: toggleTodo}
)(TodoList));
