const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    collegeName : String,
    tenantId : String,
})

module.exports = mongoose.model("tenants" , tenantSchema);