
const mongoose = require('mongoose');
// const { UserModel } = require('./User');
const mongo_url = "mongodb+srv://gk022135:Xy3UeqDydIM370Om@cluster0.mv7hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongo_url)
.then(()=>{
    console.log('MongoDB connected successfully');
})
.catch((err)=>{
    console.log('Error occurred at db.js file:', err);
});
