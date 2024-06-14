const request = require("supertest");
const app = require("../app");

const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

const user1 = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "12345678"
}

describe("Users", () => {
    describe("POST /register", () => {
        describe("Success", () => {
            test("Berhasil register", async () => {
                const { body, status } = await request(app).post("/register").send({
                    name: "Jennifer Doe",
                    email: "jenniferdoe@gmail.com",
                    password: "12345678",
                });

                expect(status).toBe(201);
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("email", expect.any(String));
            })
        })
        describe("Failed", () => {
            test("Email harus unique", async () => {
                const { body, status } = await request(app).post("/register").send(user1);

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email already exists");
            })
            test("Name tidak diberikan / tidak diinput", async () => {
                const { body, status } = await request(app).post("/register").send({
                    name: "",
                    email: user1.email,
                    password: user1.password,
                });

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Name is required");
            })
            test("Email tidak diberikan / tidak diinput", async () => {
                const { body, status } = await request(app).post("/register").send({
                    name: user1.name,
                    email: "",
                    password: user1.password,
                });

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email is required");
            })
            test("Password tidak diberikan / tidak diinput", async () => {
                const { body, status } = await request(app).post("/register").send({
                    name: user1.name,
                    email: user1.email,
                    password: "",
                });

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Password is required");
            })
            test("Email diberikan invalid", async () => {
                const { body, status } = await request(app).post("/register").send({
                    name: user1.name,
                    email: "johndoegmail.com",
                    password: user1.password,
                });

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Invalid email format");
            })
            test("Password diberikan kurang dari 8 huruf", async () => {
                const { body, status } = await request(app).post("/register").send({
                    name: user1.name,
                    email: user1.email,
                    password: "123",
                });

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Minimum password length is 8");
            })
        })
    })

    describe("POST /login", () => {
        describe("Success", () => {
            test("Berhasil login dan mengirimkan access_token", async () => {
                const { body, status } = await request(app).post("/login").send(user1);

                expect(status).toBe(200);
                expect(body).toHaveProperty("access_token", expect.any(String));
            })
        })
        describe("Failed", () => {
            test("Email tidak diberikan / tidak diinput", async () => {
                const { body, status } = await request(app).post("/login").send({
                    username: "",
                    email: "",
                    password: user1.password,
                });

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email is required");
            })
            test("Password tidak diberikan / tidak diinput", async () => {
                const { body, status } = await request(app).post("/login").send({
                    username: user1.username,
                    email: user1.email,
                    password: "",
                });

                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Password is required");
            })
            test("Email diberikan invalid / tidak terdaftar", async () => {
                const { body, status } = await request(app).post("/login").send({
                    email: "johndoegmail.com",
                    password: user1.password,
                });

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Email or Password");
            })
            test("Password diberikan salah / tidak match", async () => {
                const { body, status } = await request(app).post("/login").send({
                    email: user1.email,
                    password: "123",
                });

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Email or Password");
            })
        })
    })
})


beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [
        {
            name: user1.name,
            email: user1.email,
            password: hashPassword(user1.password),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
})