const mongoose = require("mongoose");



const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
    
});

const AdminModel = mongoose.model('AdminDB2',AdminSchema);



const createUser2 = async () => {
    const newUser = new AdminModel({
        name: 'Admin Doe current',
        email: 'johne@example12312.com',
        password: '123456',
    });
    console.log('New User:', newUser); // Verify the document structure here

    try {
        await newUser.save();
        console.log('User saved successfully');
    } catch (err) {
        console.log('Error saving user:', err.message);
    }
};
// createUser2();

module.exports = AdminModel;
