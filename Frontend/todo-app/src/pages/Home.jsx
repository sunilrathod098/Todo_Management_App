import React, { useEffect, useState } from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import {
    createTodo,
    deleteTodo,
    fetchTodos,
    updateTodo,
} from "../services/api.js";

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const loadTodos = async () => {
            const data = await fetchTodos();
            console.log("Fetched todos:", data);
            setTodos(data);
        };
        loadTodos();
    }, []);

    const addTodo = async (newTodo) => {
        const createdTodo = await createTodo(newTodo);
        if (createdTodo) {
            setTodos((prevTodos) => [...prevTodos, createdTodo]);
        }
    };

    const updateTodoHandler = async (todoId, updatedData) => {
        const updatedTodo = await updateTodo(todoId, updatedData);
        if (updatedTodo) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
            );
        }
    };

    const deleteTodoHandler = async (id) => {
        const isDeleted = await deleteTodo(id);
        if (isDeleted) {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <AddTodoForm addTodo={addTodo} />
            <TodoList
                todos={todos}
                updateTodo={updateTodoHandler}
                deleteTodo={deleteTodoHandler}
            />
        </div>
    );
};

export default Home;
