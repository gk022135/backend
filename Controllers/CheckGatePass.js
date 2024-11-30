const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const AdminModel = require("../Models/AdminModel");
const UserModel = require("../Models/User")
const checkgpass = require("../Models/checkgpass");
const Log = require("../Models/logModel")

const CheckGatePass = async (req, res) => {
    try {
        const { QrEntry, QrExit, email } = req.body;


        const ValidateUser = await UserModel.findOne({ email: email });
        if (ValidateUser && QrEntry == null && QrExit == null) {
            console.log("if works")
            const userLogs = await Log.find({ user: email });
            console.log("query work fine", userLogs)

            if (userLogs.length > 0) {
                console.log("User logs found:", userLogs);
                return res.status(200)
                    .json({

                        message: "Log mil gya",
                        success: true,
                        user,
                        createdAt
                    })
            }
            else {
                console.log("No logs found for this user.");
            }
        }


        if (!email) {
            return res.status(400).json({
                message: "Email is required.",
                success: false,
            });
        }

        if (!QrEntry && !QrExit) {
            return res.status(400).json({
                message: "Either QrEntry or QrExit is required.",
                success: false,
            });
        }

        console.log("finee1")
        console.log(ValidateUser)

        if (ValidateUser) {
            const ValidateEntry = await checkgpass.findOne({ QrEntry: QrEntry });
            const ValidateExit = await checkgpass.findOne({ QrExit: QrExit });

            if (ValidateEntry) {
                const newlog = new Log({
                    timestamp: Date.now(),
                    user: email,
                    message: "User makes Entry",
                })

                await newlog.save();
                return res.status(200).json({
                    message: "You are allowed to enter.",
                    success: true,
                });
            }

            if (ValidateExit) {
                const newlog = new Log({
                    timestamp: Date.now(),
                    user: email,
                    message: "User made Exit",
                })

                await newlog.save();
                return res.status(200).json({
                    message: "You are allowed to exit.",
                    success: true,
                });
            }


            return res.status(404).json({
                message: "No valid entry or exit QR code found.",
                success: false,
            });
        }

        const ValidateAdmin = await AdminModel.findOne({ email: email });
        console.log("admin")
        console.log(ValidateAdmin)
        
        if (ValidateAdmin) {
            console.log("cnd true")

            const newAdminData = new checkgpass({ QrEntry, QrExit });
            console.log("db 1")
            await newAdminData.save();
            console.log("db ")

            return res.status(200).json({
                message: "QR Code data saved successfully.",
                success: true,
            });
        }

        return res.status(404).json({
            message: "User or Admin not found.",
            success: false,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Scan again. An error occurred!",
            success: false,
        });
    }
};

module.exports = CheckGatePass;
