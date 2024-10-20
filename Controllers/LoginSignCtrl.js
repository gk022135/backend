//04

const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signUp = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const isUserPresent = await UserModel.findOne({email});

        if(isUserPresent){
            return res.status(409)
                  .json({message:'user already exists please login'})
        }
        const NewUserCreate = new UserModel({name,email,password});
        NewUserCreate.password = await bcrypt.hash(password,10);
        await NewUserCreate.save();
           return res.status(201)
          .json({message: 'SignUp successfully',
            success:true
          })
    }
    catch(err){
        res.status(500)
             .json({
                message:'INternal server error',
                success:false
             })

    }
}







module.exports = signUp;