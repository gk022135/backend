const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    timestamp: Date,
    user: String,
    message: String
})

const Log = mongoose.model('Log', schema)

module.exports = Log