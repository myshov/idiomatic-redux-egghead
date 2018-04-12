import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {fetchTodos} from '../api';
import {toggleTodo} from '../actions';
import TodoList from '../components/TodoList';
import {getVisibleTodos} from '../reducers';


class VisibleTodoList extends Component {
    componentDidMount() {
        const {filter} = this.props;
        fetchTodos(filter).then((todos) => {
            console.log(filter, todos);
        });
    }

    componentDidUpdate(prevProps) {
        const {filter} = this.props;
        if (prevProps.filter !== filter) {
            fetchTodos(filter).then((todos) => {
                console.log(filter, todos);
            });
        }
    }

    render() {
        return <TodoList {...this.props} />
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
    {onTodoClick: toggleTodo}
)(VisibleTodoList));

export default VisibleTodoList;
