import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Handle form input changes
    const handleChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // Validate form data
        if (Object.values(formData).some((field) => field.trim() === "")) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5050/api/v1/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            // Check if the response was successful
            if (!response.ok) {
                const data = await response.json();
                throw new Error(
                    data?.message || "Registration failed. Please try again."
                );
            }

            const data = await response.json();
            setMessage(data?.message || "User registered successfully.");
            alert("User registered successfully.");
            setFormData({
                name: "",
                email: "",
                password: "",
            });

            localStorage.setItem("userName", response.data?.user?.name);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during registration.");
        }
    };

    return (
        <div className="flex flex-col items-center text-lg justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
            <div className="bg-gray-800 shadow-md rounded-2xl p-8 max-w-md w-full">
                <h2 className="text-4xl font-bold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-50"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-50"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-50"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-10 transform -translate-y-1/2 text-gray-950"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-5 w-5" />
                            ) : (
                                <FiEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
