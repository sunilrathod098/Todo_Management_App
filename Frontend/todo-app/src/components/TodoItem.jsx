import React from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const toggleComplete = () => {
        updateTodo({ ...todo, complete: !todo.complete });
    };

    return (
        <div className="border p-4 flex justify-between items-center">
            <div>
                <h3 className={`text-lg font-bold ${todo.complete ? 'line-through' : ''}`}>
                    {todo.title}
                </h3>
                <p>{todo.description}</p>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={toggleComplete}
                    className={`px-4 py-2 rounded ${todo.complete ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                >
                    {todo.complete ? 'Completed' : 'Mark Complete'}
                </button>
                <button
                    onClick={() => deleteTodo(todo._id)}
                    className="px-4 py-2 rounded bg-red-500 text-white"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
