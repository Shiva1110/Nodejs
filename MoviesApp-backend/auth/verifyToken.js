const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.headers['auth_token'];
    if(!token) return res.status(400).send('Access Denied');
    try {
        const userInfo = jwt.verify(token, process.env.SECRET_KEY);
        req.user = userInfo.username;
        next();
    } catch(error) {
        res.status(401).json({error:'Invalid Token'});
    }
}

module.exports = auth;