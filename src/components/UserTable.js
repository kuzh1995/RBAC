import React from 'react';
import axios from 'axios';

const UserTable = ({ users }) => {
    const handleDelete = (userId) => {
        axios.delete(`http://localhost:5000/api/users/${userId}`)
            .then(() => alert('User deleted'))
            .catch(err => console.error('Error deleting user:', err));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role.name}</td>
                        <td>
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
