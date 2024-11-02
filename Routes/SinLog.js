//05


const CheckGatePass = require('../Controllers/CheckGatePass');
const { signUp } = require('../Controllers/LoginSignCtrl');
const { login } = require('../Controllers/LoginSignCtrl');
const{signUpValidation,loginValidation} = require('../Middlewares/LogSignValidation')
const router = require('express').Router();


router.post('/signup',signUpValidation,signUp);
router.post('/login',loginValidation,login);
router.post('/gatepass',CheckGatePass);

module.exports = router;
