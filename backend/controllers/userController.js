const User = require('../models/User');
const Role = require('../models/Role');

// Get all users
const getUsers = (req, res) => {
    User.find().populate('role')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: 'Error fetching users', error: err }));
};

// Create a new user
const createUser = (req, res) => {
    const { name, email, password, roleId } = req.body;

    Role.findById(roleId)
        .then(role => {
            if (!role) return res.status(404).json({ message: 'Role not found' });

            const newUser = new User({ name, email, password, role: roleId });

            return newUser.save();
        })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ message: 'Error creating user', error: err }));
};

// Update a user
const updateUser = (req, res) => {
    const { userId } = req.params;
    const updatedData = req.body;

    User.findByIdAndUpdate(userId, updatedData, { new: true })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ message: 'Error updating user', error: err }));
};

// Delete a user
const deleteUser = (req, res) => {
    const { userId } = req.params;

    User.findByIdAndDelete(userId)
        .then(() => res.status(200).json({ message: 'User deleted' }))
        .catch(err => res.status(500).json({ message: 'Error deleting user', error: err }));
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
