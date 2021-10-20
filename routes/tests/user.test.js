const { before } = require('lodash')
const request = require('supertest')
const app = require('../../app')
const userService = require('../../services/user.service')
const testUtils = require('../../utils/test.utils')
const userBody = testUtils.generateRandomUserCredentials()
const db = require('../../models')

describe("User api testing", () => {
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

    describe("POST /api-test/users/login", () => {
        describe("login success", () => {
            const cloneUserBody = JSON.parse(JSON.stringify(userBody))
            let response, expectedResponse

            beforeAll(async () => {
                response = await request(app).post('/api-test/users/login').send(cloneUserBody)
                expectedResponse = JSON.parse(response.text)
            })

            test("it should response with 200 status code", () => {
                expect(response.statusCode).toBe(200)
            })

            test("it should contains a true login success statement", () => {
                expect(expectedResponse.details.success).toBe(true)
            })

            test("it must contains the access token", () => {
                expect(expectedResponse.details).toHaveProperty("token")
            })
        })
        describe("login failed -> wrong email address", () => {
            const cloneUserBody = JSON.parse(JSON.stringify(userBody))
            cloneUserBody.email = "test0@test0.com"
            let response, expectedResponse

            beforeAll(async() => {
                response = await request(app).post('/api-test/users/login').send(cloneUserBody)
                expectedResponse = JSON.parse(response.text)
            })

            test("it should respond with 401 status code", () => {
                expect(response.statusCode).toBe(401)
            })

            test("it should response with explicit message", () => {
                expect(expectedResponse.details.message).toBe(`User with email address ${cloneUserBody.email} does not exist!`)
            })

            test("success statement must indicate that login is failed", () => {
                expect(expectedResponse.details.success).toBe(false)
            })

        })
        describe("login failed -> wrong password", () => {
            const cloneUserBody = JSON.parse(JSON.stringify(userBody))
            cloneUserBody.password = "TESTABC"
            let response, expectedResponse

            beforeAll(async() => {
                response = await request(app).post('/api-test/users/login').send(cloneUserBody)
                expectedResponse = JSON.parse(response.text)
            })

            test("it should response with 401 status code", () => {
                expect(response.statusCode).toBe(401)
            })

            test("it should response with explicit message if loginRetry < 3", () => {
                expect(expectedResponse.details.message).toBe("Invalid password!")
            })

            test("it should response with explicit message if loginRetry = 3", async() => {
                for(let i=0;i<2;i++)
                    response = await request(app).post('/api-test/users/login').send(cloneUserBody)
                expectedResponse = JSON.parse(response.text)
                expect(expectedResponse.details.message).toBe("Invalid password! User has been blocked!")
            })

            test("it should response with explicit message if loginRetry > 3", async() => {
                response = await request(app).post('/api-test/users/login').send(cloneUserBody)
                expectedResponse = JSON.parse(response.text)
                expect(expectedResponse.details.message).toBe("User is blocked!")
            })
            
            test("success statement must indicate that login is failed", () => {
                expect(expectedResponse.details.success).toBe(false)
            })
        })
    })
})
