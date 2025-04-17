const {verifyToken} = require('../utils/auth');

const authenticate= (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
};

module.exports = {
    authenticate
};