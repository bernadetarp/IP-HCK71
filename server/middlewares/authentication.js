const { verifyToken } = require("../helpers/jwt.js");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization;

        if (!access_token) {
            throw { name: "Unauthorized", message: "Invalid Token" };
        }

        const [type, token] = access_token.split(" ");

        if (type !== "Bearer" || !token) {
            throw { name: "Unauthorized", message: "Invalid Token" };
        }
        
        const data = verifyToken(token);
        const id = data.id
        const findUser = await User.findByPk(id);

        if (!findUser) {
            throw { name: "Unauthorized", message: "Invalid Token" };
        }

        req.user = findUser
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = authentication;