import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {fetchTodos} from '../api';
import * as actions from '../actions';
import TodoList from '../components/TodoList';
import {getVisibleTodos} from '../reducers';


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
        const {receiveTodos, filter} = this.props;
        fetchTodos(filter).then((todos) => {
            receiveTodos(todos, filter);
        });
    }

    render() {
        const {toggleTodo,  ...rest} = this.props;
        return (
            <TodoList 
                onTodoClick={toggleTodo}
                {...this.props} 
            />
        );
    }
}

const mapStateToProps = (state, {match}) => {
    const filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter,
    };
};

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

export default VisibleTodoList;
