
const jwtoken = require('jsonwebtoken');
const Log = require('../Models/logModel');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");

const signUp = async (req, res) => {
    try {
        const { name, email, password, hostel } = req.body;
        console.log(name," ",email," ",password," hostel");
        if (!name || !email || !password || !hostel) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false,
            });
        }

        const isUserPresent = await UserModel.findOne({ email });
        if (isUserPresent) {
            return res.status(409).json({
                message: 'User already exists, please login',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const NewUserCreate = new UserModel({
            name,
            email,
            password: hashedPassword,
            hostel,
        });

        await NewUserCreate.save();

        return res.status(201).json({
            message: 'SignUp successful',
            success: true,
        });
    } catch (err) {
        console.error("Error in signUp:", err);
        res.status(500).json({
            message: 'Internal server error in ctrl',
            success: false,
        });
    }
};

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        await Log.create({
            timestamp: Date.now(),
            user: email,
            message: "this is a log"
        })
        console.log("log set ho gaya")
        // this object use in next steps;
        const isUserPresent = await UserModel.findOne({email});
        console.log(isUserPresent)
        if(!isUserPresent){
            return res.status(400)
                .json({message:"You Have To Sign Up First",
                    success:false
                })
        }
        const isPasswordEql = await bcrypt.compare(password,isUserPresent.password);
        if(!isPasswordEql){
            return res.status(403)
              .json({message:"entered wrong password or email",
                success:false
              })
        }
        const yourJWt = jwtoken.sign(
            {email:isUserPresent.email,_id: isUserPresent._id },
            process.env.JWT_SECRETE,
            {expiresIn:'24h'}
        )
        return res.status(200)
        .json({

            message:"login success",
            success:true,
            yourJWt,
            email,
            name:isUserPresent.name,
            hostel:isUserPresent.hostel
        })
    }
    catch(error){
        return res.status(500)
         .json({
            message:"server side error in controller",
            success: false
         })

    }
}
module.exports = {signUp,login};