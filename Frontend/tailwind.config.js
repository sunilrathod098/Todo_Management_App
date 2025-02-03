/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}", // Ensure pages are included
        "./components/**/*.{js,ts,jsx,tsx}" // Include component files
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
