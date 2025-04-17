const jwt = require('jsonwebtoken');
require('dotenv').config();


//generate a JWT token

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

//verify a JWT token
const verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(err){
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};