const { sign, verify } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = {
    signToken: (payload, option) => sign(payload, secret, option),
    verifyToken: (token) => verify(token, secret) 
}