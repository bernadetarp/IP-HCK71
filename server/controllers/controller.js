const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");

const { User, Animal, Transaction } = require("../models");
const { Op } = require("sequelize");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const midtransClient = require('midtrans-client');
const axios = require("axios")

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

                option.order = [[columnName, order]];
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
                throw { name: "DataUndefined" };
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
                findUser = await User.findOne({ where: { email } });
            } else {
                throw { name: "EmailRequired" };
            }

            if (!findUser || !comparePassword(password, findUser.password)) {
                throw { name: "InvalidLogin" };
            }

            res.status(200).json({ access_token: signToken({ id: findUser.id }) });

        } catch (error) {
            next(error);
        }
    }

    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const findUser = await User.findOne({ where: { email } });

            if (!findUser) {
                res.status(404).json({ message: "User Not Found" });
            }

            const token = signToken({ id: findUser.id }, { expiresIn: "5m" });
            const link = `http://localhost:5173/reset-password/${findUser.id}/${token}`

            await User.nodemailer(email, link)

        } catch (error) {
            next(error)
        }
    }

    static async getResetPassword(req, res, next) {
        try {
            const { UserId, token } = req.params;

            const findUser = await User.findOne({ where: { id: UserId } });

            if (!findUser) {
                res.status(404).json({ message: "User Not Found" });
            }

            const verify = verifyToken(token);

            if (!verify) {
                res.json({ message: "Not Verified" })
            }

            res.json({ message: "Verified" })

        } catch (error) {
            next(error);
        }
    }

    static async postResetPassword(req, res, next) {
        try {
            const { UserId, token } = req.params;
            const { password } = req.body;

            const findUser = await User.findOne({ where: { id: UserId } });

            if (!findUser) {
                res.status(404).json({ message: "User Not Found" });
            }

            const verify = verifyToken(token);

            console.log(verify);
            if (!verify) {
                res.status(401).json({ message: "Expired Login Session" });
            }

            await findUser.update({ password: hashPassword(password) })
            res.status(200).json({ message: "Password updated!" })


        } catch (error) {
            next(error);
        }
    }

    static async getUserProfile(req, res, next) {
        try {
            const { id } = req.user;
            const findUserById = await User.findByPk(id);

            res.status(200).json({id, email: findUserById.email, name: findUserById.name, phoneNumber: findUserById.phoneNumber, imageUrl: findUserById.imageUrl});

        } catch (error) {
            next(error);
        }
    }

    static async editUserProfile(req, res, next) {
        try {
            const { id } = req.user;
            const findUserById = await User.findByPk(id);

            const { name, email, imageUrl, phoneNumber } = req.body

            await findUserById.update({ name, email, imageUrl, phoneNumber });

            res.status(200).json({ message: `Your profile successfully updated` });

        } catch (error) {
            next(error);
        }
    }

    static async deleteUserAccount(req, res, next) {
        try {
            const { id } = req.user;
            const findUserById = await User.findByPk(id);

            await Transaction.destroy({ where: { UserId: id } });
            await findUserById.destroy();

            res.status(200).json({ message: `Your account successfully deleted` });

        } catch (error) {
            next(error);
        }
    }

    static async loginByGoogle(req, res, next) {
        try {
            const { google_token } = req.headers;
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENTID,
            });

            const payload = ticket.getPayload()
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    name: payload.name,
                    email: payload.email,
                    password: `${Math.random() * 1000}`,
                    imageUrl: payload.picture
                },

            })

            res.status(200).json({ access_token: signToken({ id: user.id }) });

        } catch (error) {
            next(error);
        }
    }


    // --- Transaction
    static async formAdoption(req, res, next) {
        try {
            const { UserId } = req.user;
            const { id } = req.params;

            const { name, email, address, phoneNumber, householdType, isHavingPets, isHavingChildren, isAgree } = req.body;
            console.log(req.body)

            if (!name || !email || !address || !phoneNumber || !householdType || !isHavingPets || !isHavingChildren || !isAgree) {
                res.status(400).json({ message: "Please fill in all the data" });
            }

            await Transaction.create({ UserId, AnimalId: id, isFilledForm: true });

        } catch (error) {
            next(error)
        }
    }

    static async generateMidtransToken(req, res, next) {
        try {
            const { id } = req.params;
            const UserId = req.user.id;

            const findAnimalById = await Animal.findByPk(id);
            const findUser = await User.findByPk(UserId);

            // if (findUser.isPaid) {
            //     throw { name: "AlreadyPaid" }
            // }

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            const orderId = "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000);

            let parameter = {
                "transaction_details": {
                    "order_id": orderId, // must be unique
                    "gross_amount": findAnimalById.price
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": findUser.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            console.log(midtransToken)

            if (midtransToken) {
                await Transaction.create({ orderId: orderId, UserId: findUser.id, AnimalId: findAnimalById.id, isFilledForm: true });
            }

            res.status(200).json({ midtransToken, orderId });

        } catch (error) {
            console.log(error, "<<< error dari controller")
            next(error)
        }
    }

    static async payment(req, res, next) {
        try {
            const { orderId } = req.body;
            await Transaction.update({ isPaid: true }, { where: { orderId } });

            const order = await Transaction.findOne({ where: { orderId } })
            if (!order) {
                return res.status(404).json({message: "Transaction not found"})
            }

            if (order.isPaid === "true") {
                return res.status(400).json({message: "This transaction already paid"})
            }

            const serverKey = process.env.MIDTRANS_SERVER_KEY
            const base64ServerKey = Buffer.from(serverKey + ":").toString('base64');

            const response = await axios.get(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
                headers: {
                    Authorization: `Basic ${serverKey}`
                }
            })
            console.log(response.data, "<<< dari response.data payment")

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Controller;