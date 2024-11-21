import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', roleId: '' });
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(err => console.error('Error fetching users:', err));

        axios.get('http://localhost:5000/api/roles')
            .then(response => setRoles(response.data))
            .catch(err => console.error('Error fetching roles:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/users', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUser({ name: '', email: '', password: '', roleId: '' });
            })
            .catch(err => console.error('Error creating user:', err));
    };

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <select
                    name="roleId"
                    value={newUser.roleId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                        <option key={role._id} value={role._id}>{role.name}</option>
                    ))}
                </select>
                <button type="submit">Add User</button>
            </form>
            <UserTable users={users} />
        </div>
    );
};

export default Users;
