document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                phone: document.getElementById('phone').value,
                profession: document.getElementById('profession').value,
            };

            const response = await fetch('http://localhost:5000/api/v1/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'login.html'; // Redirect to login
            } else {
                alert(result.message || 'Registration failed');
            }
        });
    }


    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            };

            const response = await fetch('http://localhost:5000/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Login successful!');
                window.location.href = 'home.html'; // Redirect to home page
            } else {
                alert(result.message || 'Login failed');
            }
        });
    }
});
