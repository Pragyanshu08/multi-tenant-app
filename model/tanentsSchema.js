const mongoose = require("mongoose");

const tantentSchema = new mongoose.Schema({
    collegeName : String,
    tanentId : String,
})

module.exports = mongoose.model("tanents" , tantentSchema);