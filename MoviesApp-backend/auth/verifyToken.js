const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.header('auth_token');
    if(!token) return res.status(400).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch(error) {
        res.status(401).json({error:'Invalid Token'});
    }
}

module.exports = auth;