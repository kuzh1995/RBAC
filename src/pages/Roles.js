// Roles Component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoleTable from '../components/RoleTable';
import RoleForm from '../components/RoleForm';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/roles')
            .then(response => setRoles(response.data))
            .catch(err => console.error('Error fetching roles:', err));
    }, []);

    const handleChange = (e) => {
        setNewRole(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/roles', { name: newRole })
            .then(response => {
                setRoles([...roles, response.data]);
                setNewRole('');
            })
            .catch(err => console.error('Error creating role:', err));
    };

    return (
        <div>
            <h1>Roles</h1>
            {/* <RoleForm existingRole={null} onRoleSubmit={(newRole) => setRoles([...roles, newRole])} /> */}
            <RoleTable roles={roles} />
        </div>
    );
};

export default Roles;
