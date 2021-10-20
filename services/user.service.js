const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const lod = require('lodash')
const db = require('../models')
const userUtils = require('./utils/userUtils')
const userController = require('../controllers/user.controller')


const env = process.env.NODE_ENV
const config = require(__dirname + '/../config/config.json')[env]


module.exports = {
    //Register user
    registerUser: async function(req, res) {
        userUtils.validateRegisterUser(req)
            .then(async () => {
                await userController.getUser(req.body.email)
                    .then(() => {
                        return res
                            .status(302)
                            .json({title: "New user", message: "User already exists!"})
                    })
                    .catch(async () => {
                        await userController.addUser(req.body)
                            .then((newUser) => {
                            return res
                                .status(200)
                                .json({title: "New user", message: "User has been created!", data: newUser}) 
                        })
                    })
            })
            .catch((message) => {
                return res.status(400).json({title: "New user error", message: message})
            })
    },

    //Login user
    loginUser: async function(req,res) {
        await userController.getUser(req.body.email)
            .then(async (user) => {
                await userUtils.isValidCredentials(req.body.password, user)
                .then(() => {
                    const token = jwt.sign({
                        user: lod.pick(user, user, ['id', 'email'])},
                        config.AUTH_KEY,
                        {
                            expiresIn: '5m',
                        }
                    )
                    res.status(200).json({
                        title: "Login status",
                        details: {
                            success: true,
                            message: "Login with success",
                            token: token
                        }
                    })
                })
                .catch((message) => {
                    res.status(401).json({title: "Login status error", 
                    details: {
                        success: false,
                        message: message
                    }})
                })
            })
            .catch((message) => {
                res.status(401).json({title: "Login status error", 
                details: {
                    success: false,
                    message: message
                }})
            })
        },


    getUserRole: async function(req) {
        const user = await db.Users.findOne({where: {emaill: req.body.email}})
        if(user) {
            return user.userRole
        }
        return -1
    },

    getUserLoginRetry: async function(req) {
        const user = await db.Users.findOne({where: {email: req.body.email}})
        if(user) {
            return user.loginRetry
        }
        return -1
    },

    //Check password for changing
    checkPassword: async function(req) {
        const user = await db.Users.findOne({where: {email: req.body.email}})
        if(user) {
            return await userUtils.isValidCredentials(req.body.password, user.password)
        }
        return false
    },

    changePassword: async function(req) {
        const user = await db.Users.findOne({where: {email: req.body.email}})
        if(user) {
            req.body.password = await bcrypt.hash(req.body.password, 11)
            user.password = req.body.password
            await user.save()
            const token = jwt.sign({
                user: lod.pick(user, user, ['id', 'email'])},
                config.AUTH_KEY,
                {
                    expiresIn: '5m',
                }
            )
            return token
        }
        return -1
    },

    deleteUser: async function(req) {
        const user = await db.Users.findOne({ where: { email: req.body.email }})
        if(user) {
            await user.destroy()
            return true
        }
        return false
    },
    
    isUserBlocked: async function(req) {
        const user = await db.Users.findOne({ where: { email: req.body.email }})
        if(user) {
            return user.userBlocked
        }
        return -1
    },

    unblockUser: async function(req) {
        const user = await db.Users.findOne({ where: { email: req.body.email }})
        if(user && user.userBlocked) {
            user.userBlocked = false
            await user.save()
            return true
        }
        return false
    }
}