const AdminModel = require("../Models/AdminModel");
const Log = require("../Models/logModel");
const UserModel = require("../Models/User");

const CrudeOper = async (req, res) => {
    try {
        
        const { Admemail, Useremail } = req.body;
        console.log(req.body);

        const AdminPresent = await AdminModel.findOne({ email: Admemail });
        const UserPresent = await UserModel.findOne({ email: Useremail });
        console.log(UserPresent," ",AdminPresent)

        if (AdminPresent) {
            console.log("admin present")
            if (UserPresent) {
    
                const result = await UserModel.deleteOne({ email: Useremail });
                console.log("deltion done");
                console.log(result);
                if(result.deletedCount>0){
                    console.log("user deleted succefully",Useremail);
                    return res.status(200).json({
                        message: "Deletion done of user ${Useremail}",
                        success: true,
                    });
                }
            }
            else{
                return res.status(201).json({
                    message: "User Not exists",
                    success: true,
                });

            }
            
        }

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Scan again. An error occurred!",
            success: false,
        });

    }

};
module.exports = CrudeOper;