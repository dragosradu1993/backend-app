const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const env = process.env.NODE_ENV
const config = require('../../../config/config.json')[env];
const userController = require('../../../controllers/user.controller')
const dotenv = require('dotenv')
const fs = require('fs');

module.exports = {
    hashCredentials: async function(pwd) {
        return await bcrypt.hash(pwd, 11)
    },

    isValidCredentials: async function(req, data) {
        return new Promise(async (resolve, reject) => {
            if(data.userBlocked) {
                reject("User is blocked!")
            } else {
                if(await bcrypt.compare(req, data.password) && data.loginRetry < 3) {
                    resolve(true)
                } else {
                    if(data.loginRetry < 3) {
                        await userController.increaseLoginRetry(data.email)
                        reject("Invalid password!")
                    } else {
                        await userController.setBlockUser(data.email)
                        reject("Invalid password! User has been blocked!")
                    }
                }
            }
        })
    },

    generateKey: function(length) {
        let result = ''
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!_'
        const charsLength = chars.length
        for(let i = 0; i<length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength))
        }

        return result
    },

    generateFile: function(length) {
        fs.writeFile('key',this.generateKey(length), function(err) {
            if(err) {
                return console.log(err)
            }
            console.log('The key has been set')
        })
    },

    generateRandomPassword: function(length) {
        let result = ''
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!_'
        const charsLength = chars.length
        for(let i = 0; i<length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength))
        }

        return result
    },

    checkOAuthToken: async function(req) {
        return new Promise((resolve, reject) => {
            if(req.headers.hasOwnProperty('authorization')) {
                const token = req.headers.authorization.split(" ")[1]
                jwt.verify(token, config.AUTH_KEY, function(err, decoded){
                    if(err){
                        reject(`You cannot do any actions. The reason is: AUTH FAILED!`)
                    }
                    req.userData = decoded
                    resolve(req.userData)
                })
            }
            if(req.headers.hasOwnProperty('x-api-key')) {
                const key = req.headers['x-api-key']
                console.log(key === config.API_KEY)
                if(key === config.API_KEY) {
                    resolve('OK')
                } else {
                    reject(`You cannot do any actions. The reason is: AUTH FAILED!`)
                }
            }
        })
    },
        
    checkAPIKEY: async function(req) {
        return new Promise((resolve, reject) => {
            const key = req.headers['x-api-key']
            if(key === config[process.NODE_ENV].API_KEY) {
                resolve('OK')
            } else {
                reject(`You cannot do any actions. The reason is: AUTH FAILED!`)
            }
        })
    },

    validateEmail: function(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    validateRegisterUser: function(req, isLogin) {
        return new Promise((resolve, reject) => {
            if(Object.keys(req.body).length === 0) {
                reject("There is no information to create a new user")
            }
            if(!this.validateEmail(req.body.email)) {
                reject("Email address is invalid")
            }
            if(!isLogin) {
                if(req.body["roleName"] === undefined) {
                    reject('User role is not defined')
                } else {
                    if(!(req.body["roleName"] === 'ADMIN') && !(req.body["roleName"] === "SECRETARY") && !(req.body["roleName"] === "STUDENT") && !(req.body["roleName"] === "TEACHER")) {
                        reject('User role is not set correctly. User role can be "ADMIN" or "SECRETARY"')
                    }
                }
            }

            resolve("Data are passed!")
        })
    }
}