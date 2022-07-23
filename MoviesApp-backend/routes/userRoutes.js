const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../auth/verifyToken');
const router = express.Router();

router.route('/login').post(userController.loginUser);

router.route('/register').post(userController.registerUser);

router.route('/movies/:trend/:page').get(auth, userController.tmdbGetTrendingMovies);

router.route('/people/:page').get(auth, userController.tmdbGetTrendingPeople);

router.route('/search/:query').get(auth, userController.tmdbGetSearchResults);

router.route('/user/addFav').post(auth, userController.addFavorite);

router.route('/user/favorites').get(auth, userController.getFavorites);

router.route('/user/removeFav/:movieId').delete(auth, userController.removeFavorite);

module.exports = router;