import React, { useState } from 'react';
import axios from 'axios';

const RoleForm = ({ existingRole, onRoleSubmit }) => {
    const [roleName, setRoleName] = useState(existingRole ? existingRole.name : '');
    const [permissions, setPermissions] = useState(existingRole ? existingRole.permissions : []);

    const handlePermissionChange = (event) => {
        const value = event.target.value;
        setPermissions(prevPermissions => {
            if (prevPermissions.includes(value)) {
                return prevPermissions.filter(permission => permission !== value);
            } else {
                return [...prevPermissions, value];
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const roleData = {
            name: roleName,
            permissions: permissions
        };

        if (existingRole) {
            axios.put(`http://localhost:5000/api/roles/${existingRole._id}`, roleData)
                .then(response => {
                    onRoleSubmit(response.data);
                })
                .catch(err => console.error('Error updating role:', err));
        } else {
            axios.post('http://localhost:5000/api/roles', roleData)
                .then(response => {
                    onRoleSubmit(response.data);
                })
                .catch(err => console.error('Error creating role:', err));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Role Name</label>
                <input
                    type="text"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                    placeholder="Role Name"
                    required
                />
            </div>
            <div>
                <label>Permissions</label>
                <div>
                    {['create', 'edit', 'delete', 'view'].map(perm => (
                        <label key={perm}>
                            <input
                                type="checkbox"
                                value={perm}
                                checked={permissions.includes(perm)}
                                onChange={handlePermissionChange}
                            />
                            {perm}
                        </label>
                    ))}
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default RoleForm;
