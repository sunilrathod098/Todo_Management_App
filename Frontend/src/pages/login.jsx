import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons for show/hide password
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
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
            const response = await fetch("http://localhost:5050/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include", // here we include cookies in the request
            });

            // Check if the response was successful or not
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data?.message || "Login failed. Please try again.");
            }

            const data = await response.json();
            setMessage(data?.message || "User login successfully.");
            alert("User login successfully.");
            setFormData({
                email: "",
                password: ""
            });

            localStorage.setItem("userName", data?.user?.name);
            
            if (data?.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
            }
            
            setTimeout(() => {
                navigate("/todos");
            }, 1500);
        } catch (err) {
            setError(err.message || "An error occurred during login.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
            <div className="bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-4xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-50">
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
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-50">
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
                        <div className="relative">
                        <button
                            type="button"
                            className="absolute right-2 transform -translate-y-7 text-gray-950"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-5 w-5" />
                            ) : (
                                <FiEye className="h-5 w-5" />
                            )}
                        </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-50">
                        Don&apos;t have an account?
                        <button
                            className="text-blue-500 hover:underline ml-2"
                            onClick={() => navigate("/register")}
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
