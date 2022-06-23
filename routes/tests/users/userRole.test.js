const request = require('supertest')
const app = require('../../../app')
const userService = require('../../../services/user.service')
const testUtils = require('../../../utils/test.utils')
const userBody = testUtils.generateRandomUserCredentials()
const db = require('../../../models')

describe("User role tests", () => {
    describe("GET /api-test/users/get/role", () => {
        let responseLogin, userLogin
        beforeAll(async () => {
            await request(app).post('/api-test/users/register').send(userBody)
            responseLogin = await request(app).post('/api-test/users/login').send(userBody)
            userLogin = JSON.parse(responseLogin.text)
        })
    
        test("it must request authentication token to get user role", async () => {
            const response = await request(app).get('/api-test/users/get/role')
            expect(response.statusCode).toBe(401)
        }) 

        test("it should response with 200 if bearer token is available and it is not expired", async() => {
            const response = await request(app).get('/api-test/users/get/role')
                                               .set("Authorization", `bearer ${userLogin.details.token}`)
            expect(response.statusCode).toBe(200)
        })
    })
})