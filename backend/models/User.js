const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: String,
});

const Users = mongoose.model("User", UsersSchema);

module.exports = Users;