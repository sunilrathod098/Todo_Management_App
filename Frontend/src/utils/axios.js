import axios from "axios";

// Determine the base URL based on environment
const baseURL = import.meta.env.VITE_APP_ENV === 'production'
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:5050/api/v1';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;