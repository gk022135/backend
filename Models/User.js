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
    }
});

const UserModel = mongoose.model('UserDB',UserSchema);

const createUser = async () => {
    const newUser = new UserModel({
        name: 'John Doe',
        email: 'johndoe@example123.com',
        password: 'password123'
    });

    try {
        await newUser.save();
        console.log('User saved successfully');
    } catch (err) {
        console.log('Error saving user:', err);
    }
};

createUser();


module.exports = UserModel;