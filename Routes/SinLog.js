//05


const { signUp } = require('../Controllers/LoginSignCtrl');

const router = require('express').Router();


router.post('/signup', (req,res)=>{
    res.send('you did signup');
});

router.post('/login', (req,res)=>{
    res.send('you did login');
});

module.exports = router;
