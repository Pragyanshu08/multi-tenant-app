const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    tenantId: String,
});

module.exports = mongoose.model('User', userSchema);