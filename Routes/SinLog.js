//05


const { AdminLogin, AdminSign } = require('../Controllers/AdminLogin');
const CheckGatePass = require('../Controllers/CheckGatePass');
const CrudeOper = require('../Controllers/CrudOper');
const { signUp } = require('../Controllers/LoginSignCtrl');
const { login } = require('../Controllers/LoginSignCtrl');
const{signUpValidation,loginValidation} = require('../Middlewares/LogSignValidation')
const router = require('express').Router();


router.post('/signup',signUpValidation,signUp);
router.post('/login',loginValidation,login);
router.post('/gatepass',CheckGatePass);
router.post('/adminlogin',AdminLogin);
router.post('/adminsignup',AdminSign);
router.post('/crudoperation',CrudeOper);

module.exports = router;
