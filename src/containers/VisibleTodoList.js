import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as actions from '../actions';
import TodoList from '../components/TodoList';
import {getVisibleTodos, getIsFetching} from '../reducers';


class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchTodos();
    }

    componentDidUpdate(prevProps) {
        const {filter} = this.props;
        if (prevProps.filter !== filter) {
            this.fetchTodos();
        }
    }

    fetchTodos() {
        const {fetchTodos, filter} = this.props;
        fetchTodos(filter).then(() => console.log('done!'));
    }

    render() {
        const {toggleTodo, isFetching, todos} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }
        return (
            <TodoList 
                onTodoClick={toggleTodo}
                todos={todos}
            />
        );
    }
}

const mapStateToProps = (state, {match}) => {
    const filter = match.params.filter || 'all';
    return {
        isFetching: getIsFetching(state, filter),
        todos: getVisibleTodos(state, filter),
        filter,
    };
};

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

export default VisibleTodoList;
