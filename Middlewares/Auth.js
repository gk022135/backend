//07

const jwt = require('jsonwebtoken');

const ensusreAuthentication = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({
            message:'Unathurizes jwt token '
        });
    }
    try{
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(error){
        return res.status(403)
           .json({message:"Unauthorised, jwt token wrong or expired"})

    }
}
module.exports = ensusreAuthentication;