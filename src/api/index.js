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
