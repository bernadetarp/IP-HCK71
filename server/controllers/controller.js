const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User, Animal, Transaction } = require("../models");
const { Op, where } = require("sequelize");

class Controller {
    // --- Animals
    static async showAllAnimals(req, res, next) {
        try {
            const { search, sort, filter } = req.query;
            const option = { 
                where: {}
            };

            if (filter) {
                option.where = {
                    animalType: filter
                }
            }

            if (sort) {
                const order = sort[0] === "-" ? "DESC" : "ASC";
                const columnName = order === "DESC" ? sort.slice(1) : sort;

                option.order = [[ columnName, order ]];
            }

            if (search) {
                option.where.petName = {
                    [Op.iLike]: `%${search}%`
                }
            }

            const dataAnimals = await Animal.findAll(option);
            res.status(200).json(dataAnimals);

        } catch (error) {
            console.log(error)
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

    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const findUser = await User.findOne({ where: {email} });

            if (!findUser) {
                res.status(404).json({message: "User Not Found"});
            }

            const token = signToken({ id: findUser.id }, process.env.JWT_SECRET, { expiresIn: "5m" });
            const link = `http://localhost:3000/reset-password/${findUser.id}/${token}`

            console.log(link)
            // res.status(200).json({ access_token: token});

        } catch (error) {
            console.log(error, "<<<< --- dari forgotPassword")
            next(error)
        }
    }

    static async getResetPassword(req, res, next) {
        try {
            const {UserId, token} = req.params;

            const findUser = await User.findOne({ where: {id: UserId} });

            if (!findUser) {
                res.status(404).json({message: "User Not Found"});
            }

            const verify = verifyToken(token);

            if (!verify) {
                res.json({message: "Not Verified"})
            }

            res.json({message: "Verified"})

        } catch (error) {
            console.log(error, "<<<--- dari getResetPassword")
            next(error);
        }
    }

    static async postResetPassword(req, res, next) {
        try {
            const {UserId, token} = req.params;
            const { password } = req.body;

            const findUser = await User.findOne({ where: {id: UserId} });

            if (!findUser) {
                res.status(404).json({message: "User Not Found"});
            }

            const verify = verifyToken(token);

            if (!verify) {
                res.json({message: "Not Verified"})
            }

            await findUser.update({password: hashPassword(password)})
            res.status(200).json({message: "Password updated!"})


        } catch (error) {
            console.log(error, "<<<--- dari getResetPassword")
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

    static async deleteUserAccount(req, res, next) {
        try {
            const { id } = req.user;
            const findUserById = await User.findByPk(id);
                
            await Transaction.destroy({where: {UserId: id}});
            await findUserById.destroy();

            res.status(200).json({ message: `Your account successfully deleted` });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = Controller;