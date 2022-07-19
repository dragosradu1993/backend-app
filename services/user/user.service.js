const jwt = require('jsonwebtoken')
const lod = require('lodash')
const db = require('../../models')
const userUtils = require('./utils/userUtils')
const userController = require('../../controllers/user.controller')
const profileController = require('../../controllers/profiles/profile.controller')
const send = require('../mail/sender')
const appUtils = require('../app/utils/app.utils')
const messagesController = require('../../controllers/messages.controller')
const teacherController = require('../../controllers/teacher.controller')
const projectController = require('../../controllers/project.controller')
const facultiesController = require('../../controllers/faculties.controller')

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
    loginUser: async function(req,res, next) {
       await userUtils.validateRegisterUser(req, true)
        .then(async () => {
            await userController.getUser(req.body.email)
            .then(async (user) => {
                const userRole = await userController.getUserRole(user.id)
                const loggedUser = {
                    id: user.id,
                    email: user.email,
                    roleName: userRole,
                    state: user.state
                }
                await userUtils.isValidCredentials(req.body.password, user)
                .then(async () => {
                    try {
                        await userController.resetLoginRetry(user)
                        const token = jwt.sign({
                            user: lod.pick(loggedUser, ['id', 'email', 'roleName', 'state'])},
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
                    } catch(error) {
                        res.status(400).json({
                            title: "Login status",
                            details: {
                                success: false,
                                message: error,
                            }
                        })
                    }
                })
                .catch((message) => {
                    res.status(400).json({title: "Login status error", 
                    details: {
                        success: false,
                        message: message
                    }})
                    next()
                })
            })
            .catch((message) => {
                res.status(404).json({title: "Login status error", 
                details: {
                    success: false,
                    message: message
                }})
                next()
            })
        })
        .catch((message)=> {
            res.status(400).json({title: "Login status error", 
            details: {
                success: false,
                message: message
            }}) 
            next() 
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

    getStudentFullProfile: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getUserStudentFullData(request.user.id)
            .then(async (user) => {
                const dashboard = await appUtils.generateStudentDashboard(user)
                res.status(200).json({
                    ...dashboard
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

    getTeacherFullProfile: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getUserTeacherFullData(request.user.id)
            .then(async (user) => {
                const dashboard = await appUtils.generateTeacherDashboard(user)
                res.status(200).json({
                    ...dashboard
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

    getAdminDashboardData: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            let resp = {}, profile, users, blockedUsers, faculties
            try {
                profile = await userController.getProfile(req.query.id, 'password')
                if(profile) {
                    resp.profile = profile
                    users = await userController.getUsers(req.query.id)
                    if(users) {
                        resp.users = users
                        blockedUsers = await userController.getBlockedUsers('','ADMIN')
                        if(blockedUsers) {
                            resp.blockedUsers = blockedUsers
                            faculties = await facultiesController.getAll()
                            if(faculties) {
                                resp.faculties = faculties
                            }
                        }
                    }
                }
                res.status(200).json(resp)
            } catch(error) {
                if(!profile) {
                    res.status(400).json({})
                } else {
                    if(!users) {
                        resp.users = []
                    }
                    if(!blockedUsers) {
                        resp.blockedUsers = []
                    }
                    if(!faculties) {
                        resp.faculties = []
                    }
                    res.status(200).json(resp)
                }

            }
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

    setTeacherProjectSlots: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            try {
                const teacherPromotion = teacherController.setSlots(req.body)
                res.status(200).json({
                    message: "Datele privind coordonarea proiectelor a fost setată cu succes!"
                })
            }catch(error) {
                res.status(400).json({
                    message: message
                })   
            }
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
                        const changedUser = await userController.changePassword(req, user, false)
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

    selfResetPassword: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async () => {
            try {
                const user = await userController.getUser(req.query.email)
                if(user) {
                    const newPwd = userUtils.generateRandomPassword(8)
                    req.body.password = newPwd
                    await userController.changePassword(req, user, true)
                    .then(async() => {
                        await send(`<p>Parola ta tocmai a fost resetata</p><br/><p>Parola temporara este <b>${newPwd}</b></p>`, user.email, 'Parola ta a fost resetata')
                        .then((results) =>{
                            res.status(200).json({message: `Parola a fost resetata! Ti-am trimis un email cu o parola noua temporara la adresa ${user.email}`})
                        })
                        .catch((message) => {
                            res.status(400).json({message:message})
                        })
                    })
                    .catch((message) => {
                        res.status(400).json({message: message})
                    })
                }
            } catch (error) {
                res.status(400).json({message: error})
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