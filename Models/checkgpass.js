const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    createdAt: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) },
    QrEntry: { type: String, required: true },
    QrExit: { type: String, required: true }
});

const checkgpass = mongoose.model('GpassData', schema);

// const newgpass = async () => {
//     const newGp = new Checkgpass({
//         // createdAt: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) },  no rquire ment for it 
//         QrEntry: "1234523",
//         QrExit: "000000"
//     })
//     console.log("fine upto here")
//     try {
//         await newGp.save();
//         console.log("Data saved successfully");
//     } catch (err) {
//         console.error("Error occurred:", err);
//     }
// };
// console.log("hiie")

// newgpass();

module.exports =  checkgpass;
