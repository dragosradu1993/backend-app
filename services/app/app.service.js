const appController = require('../../controllers/app.controller')
const userController = require('../../controllers/user.controller')
const utils = require('./utils/app.utils')
const userUtils = require('../user/utils/userUtils')
const appUtils = require('./utils/app.utils')
const secretariesController = require('../../controllers/secretaries.controller')
const promotionController = require('../../controllers/promotion.controller')
const projectController = require('../../controllers/project.controller')

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
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            await userController.getUserRole(req.query.id)
            .then(async (role) => {
                let data = {role: role}
                if(role === 'SECRETARY') {
                    try {
                        const userProfile = await userController.getProfile(req.query.id, 'password')
                        if(userProfile) {
                            const secretaryProfile = await secretariesController.get(userProfile.Profile.id)
                            if(secretaryProfile) {
                                data.type = secretaryProfile.type
                            }
                        }
                    } catch(error) {
                        res.status(400).json({
                            title: 'App menu error',
                            message: error
                        })
                    }
                }
                const results = utils.generateAppMenuByRole(data)
                res.status(200).json(results)
            })
            .catch((message) => {
                res.status(400).json({
                    title: 'App menu error',
                    message: message
                })
            })
        }).catch((message) => {
            res.status(401).json({
                title: 'App error',
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
    },

    getDialogData: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            let data, otherData
            switch(req.query.at) {
                case 'student-add-project-request':
                    if(Object.keys(req.query.otherData).length > 0){
                        otherData = JSON.parse(req.query.otherData)
                    }
                    data = await appUtils.generateDialogData(req.query.user ? req.query.user : {}, req.query.at, req.query.otherData)
                    res.status(200).json({...data, otherData: otherData})
                    break
                default:
                    data = await appUtils.generateDialogData(req.query.user ? req.query.user : {}, req.query.at)
                    res.status(200).json(data)
                    break
            }
        })
        .catch((error) => {
            res.status(401).json({
                title: 'App error',
                message: error
            })
        })
    },

    getDataTableData: async function(req,res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            let otherData = {}, promotions
            switch(req.query.at) {
                case 'secretary-get-bachelors':
                    promotions = await promotionController.getAllByFacultyId(req.query.fid)
                    otherData.promotions = []
                    for(let i=0; i<promotions.length;i++) {
                        if(i === 0) {
                            otherData.currentPromotion = promotions[i].year
                        }
                        otherData.promotions.push(promotions[i].year)
                    }
                    
                    otherData.projects = await projectController.getByPromotionId(req.query.promotionId)
                    break
                case 'secretary-get-disertation':
                        promotions = await promotionController.getAllByFacultyId(req.query.fid)
                        otherData.promotions = []
                        for(let i=0; i<promotions.length;i++) {
                            if(i === 0) {
                                otherData.currentPromotion = promotions[i].year
                            }
                            otherData.promotions.push(promotions[i].year)
                        }
                        
                        otherData.projects = await projectController.getByPromotionId(req.query.promotionId)
                        break
                case 'secretary-get-no-proj-students':
                    promotions = await promotionController.getAllByFacultyId(parseInt(req.query.fid))
                    otherData.promotions = []
                    for(let i=0; i<promotions.length;i++) {
                        if(i === 0) {
                            otherData.currentPromotion = promotions[i].year
                        }
                        otherData.promotions.push(promotions[i].year)
                    }
                    
                    otherData.projects = await projectController.getByPromotionId(req.query.promotionId)
                    break
                case 'admin-get-all-users':
                    const users = await userController.getUsers(req.query.id)
                    otherData.users = []
                    for(let i=0;i<users.length;i++) {
                        otherData.users.push(users[i])
                    }
                    break
                case 'admin-get-all-blocked-users':
                    try {
                        const usersBlocked = await userController.getBlockedUsers({},'ADMIN')
                        otherData.users = []
                        for(let i=0;i<usersBlocked.length;i++) {
                            otherData.users.push(usersBlocked[i])
                        }
                    } catch (error) {
                        otherData.users = []
                    }

                    break
            }
            
            const data = await appUtils.generateDataGridPage(req.query.fid, req.query.at, otherData)
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(401).json({
                title: 'App error',
                message: error
            })
        })
    }

}