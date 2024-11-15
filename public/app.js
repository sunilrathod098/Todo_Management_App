// Fetch and display all users in the home page
async function fetchUsers() {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/users/all-users`); // Correct API endpoint
        const result = await response.json();

        if (response.ok) {
            const usersTable = document.getElementById('users-table').getElementsByTagName('tbody')[0];
            usersTable.innerHTML = ''; // Clear existing rows

            // Populate table with user data
            result.data.forEach(user => {
                const row = usersTable.insertRow();
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.profession}</td>
                    <td>
                        <a href="edit-user.html?id=${user._id}" class="btn btn-warning btn-sm">Edit</a>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button>
                    </td>
                `;
            });
        } else {
            console.error('Error fetching users:', result.message || 'Unknown error');
            alert(result.message || 'Failed to fetch users');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        alert('An error occurred while fetching users.');
    }
}

// Delete user function
async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
            alert('User deleted successfully!');
            fetchUsers(); // Refresh the user list
        } else {
            console.error('Error deleting user:', result.message || 'Unknown error');
            alert(result.message || 'Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user.');
    }
}

// Fetch user details for editing
async function fetchUserDetails(userId) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`);
        const result = await response.json();

        if (response.ok) {
            // Populate the form with user data
            document.getElementById('name').value = result.data.name;
            document.getElementById('phone').value = result.data.phone;
        } else {
            console.error('Error fetching user details:', result.message || 'Unknown error');
            alert(result.message || 'Failed to fetch user details');
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('An error occurred while fetching user details.');
    }
}

// Update user function
async function updateUser(userId) {
    try {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('User updated successfully!');
            window.location.href = 'index.html'; // Redirect to the home page
        } else {
            console.error('Error updating user:', result.message || 'Unknown error');
            alert(result.message || 'Failed to update user');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        alert('An error occurred while updating the user.');
    }
}


// Call fetchUsers() on page load to display users
document.addEventListener('DOMContentLoaded', () => {
    const usersTable = document.getElementById('users-table');
    if (usersTable) {
        fetchUsers();
    }

    // If on the edit page, fetch user details
    const editPage = document.getElementById('edit-user-form');
    if (editPage) {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('id');
        if (userId) {
            fetchUserDetails(userId);

            // Handle form submission
            document.getElementById('edit-user-form').addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent default form submission
                updateUser(userId);
            });
        }
    }
});

