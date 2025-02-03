import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Handle form input changes
    const handleChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // handle submission form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // validate data form
        if (Object.values(formData).some((field) => field.trim() === "")) {
            setError("All fields are required.");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include", // Include cookies in the request
            });

            // Check if the response was successful
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data?.message || "Login failed. Please try again.");
            }

            const data = await response.json();
            setMessage(data?.message || "Login successful.");
            setFormData({ email: "", password: "" });

            // redirect to the home page
            setTimeout(() => {
                navigate("/");
            }, 2000)
        } catch (err) {
            setError(err.message || "An error occurred during login.");
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email"
                            className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password"
                            className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don&apos;t have an account?
                        <button className="text-indigo-500 hover:underline ml-4"
                            onClick={() => navigate("/register")}> Register here</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
