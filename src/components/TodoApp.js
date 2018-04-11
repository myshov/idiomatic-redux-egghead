import React from 'react';

import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';


const TodoApp = ({match}) => (
    <div>
        <AddTodo />
        <VisibleTodoList filter={match.params.filter}/>
        <Footer />
    </div>
);

export default TodoApp;
