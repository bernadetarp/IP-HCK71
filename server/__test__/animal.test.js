const request = require("supertest");
const app = require("../app");

const { sequelize, User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const user1 = {
    name: "Ken",
    email: "ken@gmail.com",
    password: "12345678",
}

let access_token1;

const animal1 = {
    petName: "Max",
    intakeType: "Return",
    inDate: "03/08/2022",
    animalType: "Dog",
    sex: "M",
    breed: "AM PITBULL",
    petAge: "9 MONTHS",
}

beforeAll(async() => {
    let user_1 = await User.create(user1);
    access_token1 = signToken({ id: user_1.id });

    await queryInterface.bulkInsert("Animals", [
        {
            petName: animal1.petName,
            intakeType: animal1.intakeType,
            inDate: animal1.inDate,
            animalType: animal1.animalType,
            sex: animal1.sex,
            breed: animal1.breed,
            petAge: animal1.petAge,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
})

afterAll(async() => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete("Animals", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
})

describe("Animals", () => {
    describe("GET /", () => {
        describe("Success", () => {
            test("Berhasil mendapatkan semua data", async() => {
                const { status } = await request(app).get("/")

                expect(status).toBe(200);
            })
            test("Berhasil mendapatkan data hewan berdasarkan id", async() => {
                const { status } = await request(app).get("/1")

                expect(status).toBe(200);
            })
        })
        describe("Failed", () => {
            test("Gagal mendapatkan data hewan berdasarkan id", async() => {
                const { body, status } = await request(app).get("/99")

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Data Not Found");
            })
        })
    })
})