const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSchema = require('./models/User')

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.route('/').get((req,res) => {
    res.send('Hi there!')
});

app.route('/login').post(async (req, res) => {
    try {
        let user = await userSchema.findOne({email: req.body.email});
        if(!user) {
            res.status(401).json({ success: false, message: `User email is not registered or incorrect` });
        } else if(user.password !== req.body.password) {
            res.status(400).json({ success: false, message: `User password is incorrect` });
        } else {
            res.status(200).json({ success: true, data: `${user._id}`, token: 'token' });
        }
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.route('/register').post(async (req, res) => {
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
});

mongoose.connect(process.env.MOVIESAPP_MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
