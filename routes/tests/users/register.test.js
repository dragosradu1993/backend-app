const request = require('supertest')
const app = require('../../../app')
const userService = require('../../../services/user/user.service')
const testUtils = require('../../../utils/test.utils')
const userBody = testUtils.generateRandomUserCredentials()
const db = require('../../../models')

describe("Register User Test Suites", () => {
    describe(`POST /api-${process.env.NODE_ENV}/users/register`, () => {
        describe("issues on body request", () => {
            let newUser
            beforeAll(() => {
                newUser = testUtils.generateRandomUserCredentials()
            })

            test("it should respond with 400 if body is invalid", async() => {
                const response = await request(app).post('/api-test/users/register').send({})
                expect(response.statusCode).toBe(400)
            })

            test("it should respond with explicit message if body is invalid", async() => {
                const response = await request(app).post('/api-test/users/register').send({})
                const expectedResponse = JSON.parse(response.text)
                expect(expectedResponse.message).toBe("There is no information to create a new user")
            })

            test("it should respond with 400 if email is invalid", async() => {
                newUser.email = "test"
                const response = await request(app).post('/api-test/users/register').send(newUser)
                expect(response.statusCode).toBe(400)
            })

            test("it should respond with explicit message if email is invalid", async() => {
                newUser.email = "test"
                const response = await request(app).post('/api-test/users/register').send(newUser)
                const explicitResponse = JSON.parse(response.text)
                expect(explicitResponse.message).toBe("Email address is invalid")
            })
        })

        describe("given an email, password and userRole", () => {
            test("it should respond with 200 status code", async() => {
                const response = await request(app).post('/api-test/users/register').send(userBody)
                expect(response.statusCode).toBe(200)
            })
            test("it should respond with 302 status code if user already exist", async() => {
                const response = await request(app).post('/api-test/users/register').send(userBody)
                expect(response.statusCode).toBe(302)                
            })
            test("user already exist and it should have specific message", async() => {
                const response = await request(app).post('/api-test/users/register').send(userBody)
                const expectedResponse = JSON.parse(response.text)
                expect(expectedResponse.message).toBe("User already exists!")
            })
        })
    })
})