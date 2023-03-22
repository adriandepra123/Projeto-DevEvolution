const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || "123";

function generateToken(user) {
    const payload = {
        sub: user._id,
        iat: Date.now(),
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, jwtSecret, options);
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    generateToken,
    verifyToken,
    jwtSecret,
};
