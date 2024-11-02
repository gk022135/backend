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

const User = mongoose.model('userdb1',UserSchema);



const AdminSchema = new Schema({
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
    qrCodeData:{
        type:String,
        required:true
    }
});

const AdminModel = mongoose.model('AdminDB1',AdminSchema);



const createUser = async () => {
    const newUser = new AdminModel({
        name: 'Admin Doe',
        email: 'johne@example123.com',
        password:'123456',
        qrCodeData: 'password123',
    });

    try {
        await newUser.save();
        console.log('User saved successfully');
    } catch (err) {
        console.log('Error saving user:', err);
    }
};

// createUser();


module.exports = {User,AdminModel};