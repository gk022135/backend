const AdminModel  = require("../Models/AdminModel");
const Log = require("../Models/logModel");
const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');






const AdminSign = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isUserPresent = await AdminModel.findOne({ email });
        if (isUserPresent) {
            return res.status(409).json({ message: 'User already exists, please login' });
        }

        const NewUserCreate = new AdminModel({ name, email, password });
        NewUserCreate.password = await bcrypt.hash(password, 10);

        await NewUserCreate.save();

        const newlog = new Log({timestamp: Date.now(),
            user: email,
            message: "User signed up",})

        await newlog.save();

        return res.status(201).json({
            message: 'SignUp successfully',
            success: true,
        });

    } catch (err) {
        console.error("Error in AdminSign:", err);
        return res.status(500).json({
            message: 'Internal server error admsing',
            success: false,
        });
    }
};


const AdminLogin = async (req,res)=>{
    try{

        const {email,password} = req.body;
        const newlog = new Log({timestamp: Date.now(),
            user: email,
            message: "User Loggin up up",})

        await newlog.save();


        console.log("log set ho gaya")
        console.log("yah")

        const isUserPresent = await AdminModel.findOne({ email });

        console.log(isUserPresent);
        // console.log("hi",isUserPresent.email)


        if(!isUserPresent){
            console.log("hello")
            return res.status(400)
                .json({message:"You Have To Sign Up First",
                    success:false
                })
        }
       

        const isPasswordEql = await bcrypt.compare(password,isUserPresent.password);
        console.log(isPasswordEql)
        
        if(!isPasswordEql){
           
            return res.status(403)
              .json({message:"entered wrong password or email",
                success:false
              })
        }
        console.log("next")
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
        })
    }
    catch(error){
        return res.status(500)
         .json({
            message:"server side error in controller of adm",
            success: false
         })

    }
}
module.exports = {AdminSign,AdminLogin};