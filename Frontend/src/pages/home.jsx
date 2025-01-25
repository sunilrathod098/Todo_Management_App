// src/pages/home.jsx
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the ToDo App!</h1>
            <p>Navigate to the Register page.</p>
            {/* NavLink to Register page */}
            <NavLink to="/register" style={{ fontSize: '20px', color: 'blue' }}>
                Go to Register Page
            </NavLink>
        </div>
    );
};

export default HomePage;
