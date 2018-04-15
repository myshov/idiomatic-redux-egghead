import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as actions from '../actions';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';
import {getVisibleTodos, getIsFetching, getErrorMessage} from '../reducers';


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
        fetchTodos(filter);
    }

    render() {
        const {toggleTodo, isFetching, errorMessage, todos} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }
        if (errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchTodos()}
                />
            );
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
        errorMessage: getErrorMessage(state, filter),
        filter,
    };
};

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

export default VisibleTodoList;
