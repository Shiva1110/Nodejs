const userSchema = require('../models/User');
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

module.exports = {
    loginUser,
    registerUser
}