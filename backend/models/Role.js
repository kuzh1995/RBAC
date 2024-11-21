const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        enum: ['create', 'edit', 'delete', 'view'],
        default: ['view'] // Default to 'view' permission
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
