const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.route('/login').post(userController.loginUser);

router.route('/register').post(userController.registerUser);

module.exports = router;