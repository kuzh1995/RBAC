const express = require('express');
const { getRoles, createRole, updateRole, deleteRole } = require('../controllers/roleController');
const router = express.Router();

// Get all roles
router.get('/roles', getRoles);

// Create a new role
router.post('/roles', createRole);

// Update a role by ID
router.put('/roles/:roleId', updateRole);

// Delete a role by ID
router.delete('/roles/:roleId', deleteRole);

module.exports = router;
