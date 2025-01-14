import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        // Replace with your API call
        try {
            const response = await fetch("/api/v1/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                navigate("/");
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Registration error", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-md p-6 bg-white rounded shadow-md"
            >
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Register</h2>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Register
                </button>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
