// api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const getToken = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Retrieved token:", token);
    if (!token) {
        console.error("No token found. Redirecting to login...");
        window.location.href = "/"; // Adjust the path as needed
        throw new Error("No token found");
    }
    return token;
};

// Fetch all todos
export const fetchTodos = async () => {
    try {
        const token = await getToken();
        const response = await axios.get(`${API_URL}/todos/getAllTodos`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.status === 200 ? response.data.data : [];
    } catch (error) {
        handleAuthError(error);
        return [];
    }
};

// Create a new todo
export const createTodo = async (todoData) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${API_URL}/todos/create`, todoData, {
            headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' },
        });
        return response.status === 201 ? response.data.data : null;
    } catch (error) {
        handleAuthError(error);
        return null;
    }
};

// Update an existing todo
export const updateTodo = async (todoId, updatedData) => {
    try {
        const token = await getToken();
        const response = await axios.put(`${API_URL}/todos/update/${todoId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' },
        });
        return response.status === 200 ? response.data.data : null;
    } catch (error) {
        handleAuthError(error);
        return null;
    }
};

// Delete a todo
export const deleteTodo = async (todoId) => {
    try {
        const token = await getToken();
        const response = await axios.delete(`${API_URL}/todos/delete/${todoId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.status === 200;
    } catch (error) {
        handleAuthError(error);
        return false;
    }
};

// Handle authorization errors
const handleAuthError = (error) => {
    localStorage.removeItem('token');
    alert('Session expired. Please log in again.');
    window.location.href = "/"; // Redirect to login page
};
