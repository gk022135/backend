const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    createdAt: { type: Date, default: () => new Date(Date.now()) },
    user: String,
    message: String
})

const Log = mongoose.model('Log', schema)

module.exports = Log