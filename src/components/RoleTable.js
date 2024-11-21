import React from 'react';
import axios from 'axios';

const RoleTable = ({ roles }) => {
    const handleDelete = (roleId) => {
        axios.delete(`http://localhost:5000/api/roles/${roleId}`)
            .then(() => alert('Role deleted'))
            .catch(err => console.error('Error deleting role:', err));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Role Name</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {roles.map(role => (
                    <tr key={role._id}>
                        <td>{role.name}</td>
                        <td>{role.permissions.join(', ')}</td>
                        <td>
                            <button onClick={() => handleDelete(role._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RoleTable;
