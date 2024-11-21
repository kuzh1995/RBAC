const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Get all users
router.get('/users', getUsers);

// Create a new user
router.post('/users', createUser);

// Update a user by ID
router.put('/users/:userId', updateUser);

// Delete a user by ID
router.delete('/users/:userId', deleteUser);

module.exports = router;
