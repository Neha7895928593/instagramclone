


const express = require('express');
const { userRegisterController, loginController } = require('../Controller/AuthController');


const router = express.Router();


router.post('/signUp', userRegisterController  );
router.post('/login',loginController)

module.exports = router;
