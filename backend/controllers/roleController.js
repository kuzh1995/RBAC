const Role = require('../models/Role');

// Get all roles
const getRoles = (req, res) => {
    Role.find()
        .then(roles => res.status(200).json(roles))
        .catch(err => res.status(500).json({ message: 'Error fetching roles', error: err }));
};

// Create a new role
const createRole = (req, res) => {
    const { name } = req.body;

    const newRole = new Role({ name });

    newRole.save()
        .then(role => res.status(201).json(role))
        .catch(err => res.status(500).json({ message: 'Error creating role', error: err }));
};

// Update a role
const updateRole = (req, res) => {
    const { roleId } = req.params;
    const updatedData = req.body;

    Role.findByIdAndUpdate(roleId, updatedData, { new: true })
        .then(role => res.status(200).json(role))
        .catch(err => res.status(500).json({ message: 'Error updating role', error: err }));
};

// Delete a role
const deleteRole = (req, res) => {
    const { roleId } = req.params;

    Role.findByIdAndDelete(roleId)
        .then(() => res.status(200).json({ message: 'Role deleted' }))
        .catch(err => res.status(500).json({ message: 'Error deleting role', error: err }));
};

module.exports = { getRoles, createRole, updateRole, deleteRole };
