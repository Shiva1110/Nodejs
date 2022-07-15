const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.route('/login').post(userController.loginUser);

router.route('/register').post(userController.registerUser);

router.route('/movies/:trend/:page').get(userController.tmdbGetTrendingMovies);

router.route('/people/:page').get(userController.tmdbGetTrendingPeople);

router.route('/search/:query').get(userController.tmdbGetSearchResults);

module.exports = router;