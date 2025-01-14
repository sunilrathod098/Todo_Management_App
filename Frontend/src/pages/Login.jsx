import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/v1/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            console.log("Logged in response: ", response);
            
            if (response.ok) {
                // Get response JSON
                const data = await response.json();

                console.log("Login response: ", data);

                // Ensure tokens are in the response before accessing
                if (data && data.data && data.data.tokens) {
                    // Store tokens in localStorage
                    localStorage.setItem("accessToken", data.data.tokens.accessToken);
                    localStorage.setItem("refreshToken", data.data.tokens.refreshToken);

                    // Navigate to Todos page
                    navigate("/todos");
                } else {
                    console.error("Tokens not found in response");
                    alert("Something went wrong while logging in. Please try again.");
                }
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md p-6 bg-white rounded shadow-md"
            >
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
                    Login
                </h2>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email
                    </label>
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
                    <label className="block text-sm font-semibold text-gray-700">
                        Password
                    </label>
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
                    Login
                </button>
                <p className="mt-4 text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <a
                        href="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
