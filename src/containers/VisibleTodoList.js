import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

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
        const {fetchTodos, filter} = this.props;
        fetchTodos(filter);
    }

    render() {
        const {toggleTodo,  ...rest} = this.props;
        return (
            <TodoList 
                onTodoClick={toggleTodo}
                {...rest} 
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
