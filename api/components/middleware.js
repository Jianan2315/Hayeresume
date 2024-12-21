const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token){
        console.log('Just double-check if you really need auth for this step.');
        return res.status(403).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, PUBLIC_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

module.exports = authenticate;