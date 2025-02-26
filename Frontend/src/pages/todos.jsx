import { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axios";

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTodo, setNewTodo] = useState({ title: "", description: "" });
    const [editingTodo, setEditingTodo] = useState(null);
    const [userName, setUserName] = useState("");
    const updateFormRef = useRef(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        fetchTodos();
        fetchUserInfo(); // Fetch user info when the component mounts
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axiosInstance.get("/todos/fetchAllTodos");
            console.log("Fetched todos:", response.data);

            if (response.data.success && Array.isArray(response.data.message)) {
                setTodos(response.data.message);
            } else {
                console.error("Unexpected response:", response.data);
                setTodos([]);
            }
        } catch (error) {
            console.error("Error while fetching todos:", error);
            setTodos([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInfo = async () => {
        try {
            setLoadingUser(true);
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.warn("No access token found, setting Guest as default user.");
                setUserName("Guest");
                setLoadingUser(false);
                return;
            }

            console.log("Fetching user info with token:", token);

            const response = await axiosInstance.get("/users/userInfo", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Full API response:", response); // Log full response
            console.log("Response data:", response.data); // Log response data only

            if (!response.data) {
                console.warn("Response data is undefined, setting Guest.");
                setUserName("Guest");
                return;
            }

            console.log(
                "API response structure:",
                JSON.stringify(response.data, null, 2)
            );

            // Check if response has expected structure
            if (response.data.success) {
                if (response.data.data.name) {
                    setUserName(response.data.data.name);
                    console.log("User Name Set:", response.data.name);
                } else {
                    console.warn("Response missing 'name', setting Guest.");
                    setUserName("Guest");
                }
            } else {
                console.warn("Response not successful, setting Guest.");
                console.log("Received API response:", response.data);
                setUserName("Guest");
            }
        } catch (error) {
            console.error("Error while fetching user info:", error);

            // Handle unauthorized error
            if (error.response) {
                console.log("Error Response:", error.response);
                if (error.response.status === 401) {
                    console.warn("Unauthorized access, redirecting to login.");
                    localStorage.removeItem("accessToken"); // Clear invalid token
                }
            }
            setUserName("Guest");
        } finally {
            setLoadingUser(false);
        }
    };



    const handleCreateTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.title.trim() || !newTodo.description.trim()) {
            alert("Title and description are required.");
            return;
        }
        try {
            const response = await axiosInstance.post("/todos/create", newTodo);
            console.log("Created todo:", response.data);
            if (response.data.success) {
                const newTodoItem = response.data.message;
                setTodos([...todos, newTodoItem]);
                setNewTodo({ title: "", description: "" });
                alert("Todo created successfully!"); // Success message
            } else {
                alert("Error creating todo: " + response.data.message); // Error message
            }
        } catch (error) {
            console.log("Error while creating todo:", error);
            alert("An error occurred while creating the todo.");
        }
    };

    const handleUpdateTodo = async (e) => {
        e.preventDefault();

        if (!editingTodo || !editingTodo._id) {
            console.error("No todo selected for update");
            return;
        }
        try {
            const response = await axiosInstance.put(
                `/todos/update/${editingTodo._id}`,
                editingTodo
            );
            if (response.data.success) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === editingTodo._id
                            ? { ...todo, ...response.data.data }
                            : todo
                    )
                );
                setEditingTodo(null);
                alert("Todo updated successfully!"); // Success message
            } else {
                alert("Error updating todo: " + response.data.message); // Error message
            }
        } catch (error) {
            console.log("Error while updating todo:", error);
            alert("An error occurred while updating the todo.");
        }
    };

    const handleDeleteTodo = async (todoId) => {
        if (!todoId) {
            console.error("Invalid todo ID for deletion");
            return;
        }
        try {
            const response = await axiosInstance.delete(`/todos/delete/${todoId}`);
            if (response.data.success) {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo._id !== todoId)
                );
                alert("Todo deleted successfully!"); // Success message
            } else {
                alert("Error deleting todo: " + response.data.message); // Error message
            }
        } catch (error) {
            console.log("Error while deleting todo:", error);
            alert("An error occurred while deleting the todo.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-6">Todo Management</h2>
            {loadingUser ? (
                <p>Loading user...</p>
            ) : (
                <p className="text-xl text-white mb-4">Welcome, {userName}</p>
            )}
            {/* Display user's name */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h3 className="text-xl font-semibold mb-4">Create Todo</h3>
                <form onSubmit={handleCreateTodo} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newTodo.description}
                        onChange={(e) =>
                            setNewTodo({ ...newTodo, description: e.target.value })
                        }
                        className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600"
                    >
                        Create Todo
                    </button>
                </form>
            </div>
            {editingTodo && (
                <div
                    ref={updateFormRef}
                    className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl mt-6"
                >
                    <h3 className="text-xl font-semibold mb-4">Edit Todo</h3>
                    <form onSubmit={handleUpdateTodo} className="space-y-4">
                        <input
                            type="text"
                            value={editingTodo.title}
                            onChange={(e) =>
                                setEditingTodo({ ...editingTodo, title: e.target.value })
                            }
                            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            value={editingTodo.description}
                            onChange={(e) =>
                                setEditingTodo({ ...editingTodo, description: e.target.value })
                            }
                            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-green-500 py-2 rounded-md hover:bg-green-600"
                        >
                            Update Todo
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingTodo(null)}
                            className="w-full bg-gray-500 py-2 rounded-md hover:bg-gray-600 mt-2"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            <h3 className="text-3xl font-semibold mt-8">Your Daily Todo&apos;s</h3>
            {loading ? (
                <p className="mt-4">Loading...</p>
            ) : (
                <ul className="w-full max-w-4xl mt-8">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <li
                                key={todo._id}
                                className="bg-gray-800 p-6 rounded-lg shadow-md mb-4"
                            >
                                <h4 className="text-lg font-semibold text-white">
                                    {todo.title ? todo.title : "No Title"}
                                </h4>
                                <p className="text-gray-400 h-20 overflow-y-auto">
                                    {" "}
                                    {/* Fixed height and scrollable */}
                                    {todo.description ? todo.description : "No Description"}
                                </p>
                                <div className="flex justify-end gap-4 mt-2">
                                    <button
                                        className="bg-green-500 px-3 py-1 rounded text-white"
                                        onClick={() => setEditingTodo(todo)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 px-3 py-1 rounded text-white"
                                        onClick={() => handleDeleteTodo(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-400">No todos found</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default TodoPage;
