const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const {UserModel ,AdminModel} = require("../Models/User");

const Checkgpass = require("../Models/checkgpass");

const CheckGatePass = async (req,res)=>{
    try{

        const qrCodeData = await req.body.qrCodeData;
        const ValidateEntry =  await Checkgpass.findOne({QrEntry});
        const ValidateExit =  await Checkgpass.findOne({QrExit});


        if(ValidateEntry){
            return res.status(200)
            .json({
                message:"you can go bsdk",
                success:true,
            })
        }
        if(ValidateEntry){
            return res.status(200)
            .json({
                message:"you can go bsdk",
                success:true,
            })
        }
        const newAdminData = new AdminModel({ qrCodeData });
        await newAdminData.save();
         res.status(200).json({ message: "QR Code data saved successfully"});

    }
    
    catch(error){
        return res.status(500)
        .json({
           message:"Scann again bsdk !!",
           success: false
        })


    }

}
module.exports = CheckGatePass;