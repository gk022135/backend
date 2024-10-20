//02 kaam

const mongoose = require('mongoose');
const mongo_url = "mongodb://localhost:27017/myDatabase";

mongoose.connect(mongo_url)
.then(()=>{
    console.log('MongoDB connected successfully');
})
.catch((err)=>{
    console.log('Error occurred at db.js file:', err);
});
