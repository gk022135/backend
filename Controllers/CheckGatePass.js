const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const {UserModel ,AdminModel} = require("../Models/User");

const CheckGatePass = async (req,res)=>{
    try{

        const qrCodeData = await req.body.qrCodeData;
        const gpVAlidate  =  await AdminModel.findOne({qrCodeData});
        
        if(gpVAlidate){
            return res.status(200)
            .json({
                message:"you can go bsdk",
                success:true
            })
        }
        const newAdminData = new AdminModel({ qrCodeData });
        await newAdminData.save();
         res.status(200).json({ message: "QR Code data saved successfully" });


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