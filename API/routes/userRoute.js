const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.addUser);

router.route('/:userId').get(userController.getUseById).delete(userController.deleteUserById).patch(userController.updateUserName).put(userController.updateUserDetails);

module.exports = router;