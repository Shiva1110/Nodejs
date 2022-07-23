const userSchema = require('../models/User');
const axios = require('axios').default;
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        let user = await userSchema.findOne({email: req.body.email});
        if(!user) {
            res.status(401).json({ success: false, message: `User email is not registered or incorrect` });
        } else if(user.password !== req.body.password) {
            res.status(400).json({ success: false, message: `User password is incorrect` });
        } else {
            const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.SECRET_KEY)
            res.status(200).json({ success: true, data: `${user._id}`, token: token });
        }
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        let email = await userSchema.findOne({email: req.body.email});
        if(email) {
            res.status(400).json({ success: false, message: `User email already registered` });
        } else {
            const user = new userSchema(req.body);
            await user.save();
            res.status(201).json({ success: true, message: `User successfully registered` });
        }
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const tmdbGetTrendingMovies = async (req, res) => {
    try {
        let trendingMovies = await axios.get(`https://api.themoviedb.org/3/trending/movie/${req.params.trend}?api_key=${process.env.TMDB_API_KEY}&page=${req.params.page}`);
        res.status(200).json(trendingMovies.data);
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const tmdbGetTrendingPeople = async (req, res) => {
    try {
        let trendingPeople = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&page=${req.params.page}`);
        res.status(200).json(trendingPeople.data);
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const tmdbGetSearchResults = async (req, res) => {
    try {
        let searchRes = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${req.params.query}`);
        res.status(200).json(searchRes.data);
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const addFavorite = async (req, res) => {
    try {
        let user = await userSchema.findByIdAndUpdate(req.userId, { "$push": { "favorites": req.body } }, { "new": true, "upsert": true });
        res.status(200).json(user.favorites);
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const removeFavorite = async (req, res) => {
    try {
        let user = await userSchema.findByIdAndUpdate(req.userId, { "$pull": { "favorites": { id: Number(req.params.movieId) } } }, { safe: true, new: true, upsert: true });
        res.status(200).json(user.favorites);
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const getFavorites = async (req, res) => {
    try {
        let user = await userSchema.findById(req.userId);
        res.status(200).json(user.favorites);
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = {
    loginUser,
    registerUser,
    tmdbGetTrendingMovies,
    tmdbGetTrendingPeople,
    tmdbGetSearchResults,
    addFavorite,
    removeFavorite,
    getFavorites
}