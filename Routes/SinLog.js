//05


const { signUp } = require('../Controllers/LoginSignCtrl');
const { login } = require('../Controllers/LoginSignCtrl');
const{signUpValidation,loginValidation} = require('../Middlewares/LogSignValidation')
const router = require('express').Router();


router.post('/signup',signUpValidation,signUp);
router.post('/login',loginValidation,login);

module.exports = router;
