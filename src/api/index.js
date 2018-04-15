import {v4} from 'uuid';


const fakeDatabase = {
    todos: [{
        id: v4(),
        text: 'hey',
        completed: false,
    }, {
        id: v4(),
        text: 'ho',
        completed: false,
    }, {
        id: v4(),
        text: 'check something',
        completed: true,
    }],
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
    delay(500).then(() => {
        if (Math.random() > 0.5) {
            throw new Error('Boom!');
        }

        switch (filter) {
            case 'all':
                return fakeDatabase.todos;
            case 'active':
                return fakeDatabase.todos.filter(todo => !todo.completed);
            case 'completed':
                return fakeDatabase.todos.filter(todo => todo.completed);
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    });

export const addTodo = (text) =>
    delay(500).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false,
        };
        fakeDatabase.todos.push(todo);
        return todo;
    });

export const toggleTodo = (id) =>
    delay(500).then(() => {
        const todo = fakeDatabase.todos.find§(todo => todo.id === id);
        todo.completed = !todo.completed;
        return todo;
    });
