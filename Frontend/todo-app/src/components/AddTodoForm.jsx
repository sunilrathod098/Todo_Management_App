import React, { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
            addTodo({ title, description, complete: false });
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Todo</h2>
            <input
                type="text"
                placeholder="Title"
                className="border w-full p-2 mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                className="border w-full p-2 mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Todo
            </button>
        </form>
    );
};

export default AddTodoForm;
