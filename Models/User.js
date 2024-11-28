//03 kaan user ka schema define krna

const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    },
    hostel:{
        type:String,
        required:true
    }
});

const UserModel = mongoose.model('userdb1',UserSchema);

// const createUser = async () => {
//     const newUser = new UserModel({
//         name: 'hello ji2"',
//         email: 'wehuie@gmail.com',
//         password: '123456',
//         hostel: 'password123',
//     });
//     console.log('New User:', newUser); // Verify the document structure here

//     try {
//         await newUser.save();
//         console.log('User saved successfully new');
//     } catch (err) {
//         console.log('Error saving user:', err.message);
//     }
// };
// createUser();



module.exports = UserModel;