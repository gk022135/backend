const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    createdAt: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) },
    user: String,
    message: String
})

const Log = mongoose.model('Log', schema)

module.exports = Log