const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Animal } = require("../models");

class Controller {
    // --- Animals
    static async showAllAnimals(req, res, next) {
        try {
            const dataAnimals = await Animal.findAll();
            res.status(200).json(dataAnimals);

        } catch (error) {
            next(error);
        }
    }

    static async showAnimalById(req, res, next) {
        try {
            const { id } = req.params;
            const dataAnimalById = await Animal.findByPk(id);

            if (!dataAnimalById) {
                throw { name: "DataUndefined"};
            }

            res.status(200).json(dataAnimalById)

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
            const { id } = req.user;
            const findUserById = await User.findByPk(id);
            
            const { name, email, password, imageUrl, phoneNumber } = req.body

            if (!password) {
                throw { name: "PasswordRequired" }
            } else if (password.length < 8) {
                res.status(400).json({message: "Minimum password length is 8"})
            }

            await findUserById.update({name, email, password: hashPassword(password), imageUrl, phoneNumber});

            res.status(200).json({ message: `Your profile successfully updated` });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async deleteUserProfile(req, res, next) {
        try {
            const { id } = req.user;
            const findUserById = await User.findByPk(id);

            await findUserById.destroy();
            res.status(200).json({ message: `Your account successfully deleted` });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = Controller;