const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    tanentId: String,
});

module.exports = mongoose.model('User', userSchema);