import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between">
            <h1 className="text-2xl font-bold">Todo App</h1>
            <div>
                <a href="/" className="mr-4">
                    Home
                </a>
                <a href="/login" className="mr-4">
                    Login
                </a>
                <a href="/register">Register</a>
            </div>
        </nav>
    );
};

export default Navbar;
