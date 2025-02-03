// src/pages/home.jsx
import { NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to the ToDo App!</h1>
            <p className="text-lg mb-6">Manage your tasks efficiently.</p>

            <div className="space-x-4">
                <NavLink to="/login">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Login
                    </button>
                </NavLink>
                <NavLink to="/register">
                    <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Register
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default HomePage;
