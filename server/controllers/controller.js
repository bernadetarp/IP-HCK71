const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Animal } = require("../models");

class Controller {
    // --- Animals
    static async showAllAnimals(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    static async showAnimalById(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    static async formAdoption(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    static async payment(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }


    // --- Users
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({ name, email, password })
            res.status(201).json({ 
                name: user.name,
                email: user.email
            });

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!password) {
                throw { name: "PasswordRequired" };
            }

            let findUser;

            if (email) {
                findUser = await User.findOne({ where: {email} });
            } else {
                throw { name: "EmailRequired" };
            }

            if (!findUser || !comparePassword(password, findUser.password)) {
                throw { name: "InvalidLogin" };
            }

            res.status(200).json({ access_token: signToken({ id: findUser.id })});

        } catch (error) {
            next(error);
        }
    }

    static async editUserProfile(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    static async deleteUserProfile(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

}

module.exports = Controller;