const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    createdAt: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) },
    QrEntry: { type: String, required: true },
    QrExit: { type: String, required: true }
});

const Checkgpass = mongoose.model('GpassData', schema);

const newgpass = async () => {
    const newGp = new Checkgpass({
        createdAt: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) },
        QrEntry: "helloucan gout",
        QrExit: "hello come in"
    })
    console.log("fine upto here")
    try {
        await newGp.save();
        console.log("Data saved successfully");
    } catch (err) {
        console.error("Error occurred:", err);
    }
};

newgpass();

module.exports =  Checkgpass;
