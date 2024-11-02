//06

const Joi = require('joi');

const signUpValidation = (req,res,next)=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email: Joi.string().email().pattern(/@smvdu\.ac\.in$/)
        .messages({
            'string.pattern.base': 'Email must end with "@smvdu.ac.in".',  // Custom error message
          })
        .required(),
        password:Joi.string().min(4).max(15).required(),
        hostel:Joi.string().min(4).max(20).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request use university email id",error})
    }
    next();

}
const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().pattern(/@smvdu\.ac\.in$/)
        .messages({
            'string.pattern.base': 'Email must end with "@smvdu.ac.in".',  // Custom error message
          }),
        password:Joi.string().min(4).max(15).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
           .json({
            message:"Bad request in Middleware at login time", error
           })
    }
    next();
}

module.exports = {signUpValidation,loginValidation};