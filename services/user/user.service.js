const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const lod = require('lodash')
const db = require('../../models')
const userUtils = require('./utils/userUtils')
const userController = require('../../controllers/user.controller')
const profileController = require('../../controllers/profiles/profile.controller')

const env = process.env.NODE_ENV
const config = require("../../config/config.json")[env]


module.exports = {
    //Register user
    registerUser: async function(req, res) {
        userUtils.validateRegisterUser(req, false)
            .then(async () => {
                await userController.getUser(req.body.email)
                .then(() => {
                    return res
                        .status(302)
                        .json({title: "New user", message: "User already exists!"})
                    })
                .catch(async () => {
                    await userController.add(req.body, false)
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
        userUtils.validateRegisterUser(req, true)
        .then(async () => {
            await userController.getUser(req.body.email)
            .then(async (user) => {
                const userRole = await userController.getUserRole(user.id)
                const loggedUser = {
                    id: user.id,
                    email: user.email,
                    roleName: userRole
                }
                await userUtils.isValidCredentials(req.body.password, user)
                .then(() => {
                    const token = jwt.sign({
                        user: lod.pick(loggedUser, ['id', 'email', 'roleName'])},
                        config.AUTH_KEY,
                        {
                            expiresIn: '240m',
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
                    res.status(400).json({title: "Login status error", 
                    details: {
                        success: false,
                        message: message
                    }})
                })
            })
            .catch((message) => {
                res.status(404).json({title: "Login status error", 
                details: {
                    success: false,
                    message: message
                }})
            })
        })
        .catch((message)=> {
            res.status(400).json({title: "Login status error", 
            details: {
                success: false,
                message: message
            }})  
        })
 
        },
    
    getUsersByRole: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getByRole(req.query.rls)
            .then((users) => {
                res.status(200).json(users)
            })
            .catch((message) => {
                res.status(404).json({
                    title: "User error",
                    details: {
                        success: false,
                        message: message
                    }
                })
            })
        })
        .catch((message) => {
            res.status(401).json({
                title: "User Info Error",
                details: {
                    success: false,
                    message: message
                }
            })            
        })
    },

    getUserProfile: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getProfile(request.user.id, 'password')
            .then((user) => {
                res.status(200).json({
                    title: "User Info",
                    details: {
                        success: true,
                        userData: user
                    }
                })
            })
            .catch((message) => {
                res.status(404).json({
                    title: "User Info Error",
                    details: {
                        success: false,
                        message: message
                    }
                })                
            })
        })
        .catch((message) => {
            res.status(401).json({
                title: "User Info Error",
                details: {
                    success: false,
                    message: message
                }
            })            
        })
    },

    getUserRole: async function(req, res) {
        await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                await userController.getUserRole(request.user.id)
                    .then((user) => {
                        res.status(200).json({
                            title: "User Info",
                            details: {
                                success: true,
                                userData: {
                                    email: user.email,
                                    userRole: user.userRole
                                }
                            }
                        })
                    })             
                })
            .catch((message) => {
                res.status(401).json({
                    title: "User Info Error",
                    details: {
                        success: false,
                        message: message
                    }
                })
            })
            
    },

    changePassword: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            try {
                const user = await userController.getUser(request.user.email)
                if(user) {
                        const changedUser = await userController.changePassword(req,user, req.query.fl)
                        if(changedUser)
                        {
                            res.status(200)
                            .json({
                                title: "Check credentails",
                                success: true,
                                message: `Password has been changed!`
                            })
                        }
                }
            } catch(error) {
                res.status(404)
                .json({
                    title: "Check credentials error",
                    success: false,
                    message: error
                }) 
            }
        })
        .catch((error) => {
            res.status(401).json({
                title: "Error",
                details: {
                    success: false,
                    message: error
                }
            })
        })
    },

    getBlockedUsers: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getBlockedUsers(request.user.roleName)
            .then((users) => {
                res.status(200).json({
                    users
                })         
            })
            .catch((message) => {
                res.status(400).json({
                    title: "Error",
                    success: false,
                    message: message
                })
            })
        })
        .catch((error) => {
            res.status(401).json({
                title: "Error",
                details: {
                    success: false,
                    message: error
                }
            })
        })
    },

    deleteUser: async function(req) {
        const user = await db.Users.findOne({ where: { email: req.body.email }})
        if(user) {
            await user.destroy()
            return true
        }
        return false
    },

    passwordReset: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            userController.getUser(req.query.email)
            .then((user) => {
                userController.changePassword(req, user)
                .then(() => {
                    res.status(200).json({
                        message: 'Password has been reset'
                    })
                })
                .catch((message) => {
                    res.status(400).json({
                        message: message
                    })
                })
            })
            .catch((message) => {
                res.status(200).json({
                    message: message
                })
            })
        })
        .catch((error) => {
            res.status(401).json({
                title: "Error",
                details: {
                    success: false,
                    message: error
                }
            })
        })
    },

    unblockUser: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            if(req.query.role==='ADMIN') {
                userController.getUser(req.body.email)
                .then((user) => {
                    userController.unblockUser(user)
                    .then(() => {
                        res.status(200).json({
                            message: "User has been unblocked!"
                        })
                    })
                    .catch((message)=> {
                        res.status(400).json({
                            message: message
                        })
                    })
                })
                .catch((message) => {
                    res.status(404).json({
                        message: message
                    })
                })
            } else {
                res.status(400).json({
                    message: "You don't have permissions to perform this task"
                })
            }
        })
        .catch((error) => {
            res.status(401).json({
                title: "Error",
                details: {
                    success: false,
                    message: error
                }
            })
        })
    },

    editProfile: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(() => {
            profileController.edit(req.body, req.query.id)
            .then((message) => {
                res.status(200).json({
                    title: "Edit profile",
                    details: {
                        success: true,
                        message: message
                    }
                })
            })
            .catch((message) => {
                res.status(400).json({
                    title: "Edit profile",
                    details: {
                        success: false,
                        message: message
                    }
                })
            })
        })
        .catch((error) => {
            res.status(401).json({
                title: "Error",
                details: {
                    success: false,
                    message: error
                }
            })
        })
    }
}