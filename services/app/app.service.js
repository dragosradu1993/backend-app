const appController = require('../../controllers/app.controller')
const userController = require('../../controllers/user.controller')
const utils = require('./utils/app.utils')
const userUtils = require('../user/utils/userUtils')
const appUtils = require('./utils/app.utils')

const env = process.env.NODE_ENV
const config = require("../../config/config.json")[env]


module.exports = {
    //Register user
    add: async function(req, res) {
        await appController.get()
        .then((appInfo) => {
            return res
                .status(302)
                .json({title: "App info settings", message: "App information already exists!", data: appInfo})
            })
        .catch(async (error) => {
            await appController.add(req.body)
            .then((appInfo) => {
                return res
                    .status(200)
                    .json({title: "App info settings", message: "App information has been saved!", data: appInfo}) 
                })
            .catch((message) => {
                return res.status(400).json({title: "App info settings", message: message})
            })
        })
    },
    
    getInfo: async function(req, res) {
        await appController.get()
        .then((isSet) => {
            res.status(200).json(isSet)
        })
        .catch((message) => {
            res.status(404).json({
                title: "App Info settings error",
                details: {
                    success: false,
                    message: message
                }
            })
        })
    },

    getInfoIsSetApp: async function(req, res) {
        await appController.getIsSet()
        .then((isSet) => {
            res.status(200).json(isSet)
        })
        .catch((isSet) => {
            res.status(200).json(isSet)
        })
    },

    getUsersLastXDays: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            try {
                const user = await userController.getUserFullData(request.user.email, false)
                if(user.UserRole.roleName === 'ADMIN') {
                    const usersLastXDays = await userController.getUsersLastXDays(req.query.days)
                    res.status(200).json(usersLastXDays)
                } else {
                    res.status(403)
                    .json({
                        title: "App Info Error",
                        success: false,
                        message: "You don't have permissions to perform this operation. Please check with the Administrator!"
                    })
                }
            } catch(error) {
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

    //Only admin can edit the app Info
    edit: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            try {
                const user = await userController.getUserFullData(request.user.email, false)
                if(user.UserRole.roleName === 'ADMIN') {
                    await appController.get()
                    .then(async (app) => {
                        await appController.edit(req.body, app)
                        .then(() => {
                            res.status(200)
                            .json({
                                title: "App Info",
                                success: true,
                                message: "App Info has been changed!"
                            })
                        })
                    })
                    .catch((message) => {
                        res.status(404)
                        .json({
                            title: "App Info Error",
                            success: false,
                            message: message
                        })
                    })
                } else {
                    res.status(403)
                    .json({
                        title: "App Info Error",
                        success: false,
                        message: "You don't have permissions to perform this operation. Please check with the Administrator!"
                    })
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
    

    //Only admin can delete the app Info
    deleteInfo: async function(req) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getUserFullData(request.user.email, false)
            .then(async (user) => {
                if(user.UserRole.roleName === 'ADMIN') {
                    await appController.get()
                    .then(async (app) => {
                        await appController.delete(app)
                        .then((message) => {
                            res.status(200)
                            .json({
                                title: "App Info",
                                success: true,
                                message: message
                            })
                        })
                        .catch((message) => {
                            res.status(400)
                            .json({
                                title: "App Info",
                                success: false,
                                message: message
                            })
                        })
                    })
                    .catch((message) => {
                        res.status(404)
                        .json({
                            title: "App Info Error",
                            success: false,
                            message: message
                        })
                    })
                } else {
                    res.status(403)
                    .json({
                        title: "App Info Error",
                        success: false,
                        message: "You don't have permissions to perform this operation. Please check with the Administrator!"
                    })
                }
            })
            .catch((message) => {
                res.status(404)
                .json({
                    title: "Check credentials error",
                    success: false,
                    message: message
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
    })},

    /*
    *  Application data for UI
    *
    */

    getAppMenu: async function(req, res) {
        await userController.getUserRole(req.query.id)
        .then((role) => {
            const results = utils.generateAppMenuByRole(role)
            res.status(200).json(results)
        })
        .catch((message) => {
            res.status(400).json({
                title: 'App menu error',
                message: message
            })
        })
    },

    getAppDashboard: async function(req, res) {
        let dashboard = {
            content: []
        }
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getBlockedUsers(req.query.id,req.query.role)
            .then((data) => {
                const results = utils.generateAdminDashboardContent(data, dashboard)
                res.status(200).json(results)
            })
            .catch((message) => {
                res.status(400).json({message: message})
            })
        })
        .catch((message) => {
            res.status(401).json({
                title: 'App error',
                message: message
            })
        })
    },

    getAllUsersData: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getUsers(req.query.id)
            .then( (results) => {
                const jsonResults = appUtils.generateAllUsersDataGrid(results)
                res.status(200).json(jsonResults)
            })
            .catch( (results) => {
                const jsonResults = appUtils.generateAllUsersDataGrid(results)
                res.status(404).json(jsonResults)
            })
        }).catch((message) => {
            res.status(401).json({
                title: 'App error',
                message: message
            })
        })
    },

    getBlockedUsers: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getBlockedUsers(req.query.id, req.query.role)
            .then( (results) => {
                const jsonResults = appUtils.generateAllBlockedUsersDataGrid(results)
                res.status(200).json(jsonResults)
            })
            .catch((results) => {
                const jsonResults = appUtils.generateAllBlockedUsersDataGrid(results)
                res.status(404).json(jsonResults)
            })
        }).catch((message) => {
            res.status(401).json({
                title: 'App error',
                message: message
            })
        })
    }
}