const appController = require('../../controllers/app.controller')
const userController = require('../../controllers/user.controller')
const facultiesController = require('../../controllers/faculties.controller')
const utils = require('./utils/app.utils')
const userUtils = require('../user/utils/userUtils')
const appUtils = require('./utils/app.utils')

const env = process.env.NODE_ENV
const config = require("../../config/config.json")[env]


module.exports = {
    add: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            if(request.user.roleName === 'ADMIN') {
                await facultiesController.add(req.body)
                .then((message) => {
                    res.status(200).json({
                        title: "Add faculty",
                        message: "Faculty has been added!"
                    })
                })
                .catch((message) => {
                    res.status(400).json({
                        title: "Add faculty error",
                        message: message
                    })
                })
            } else {
                res.status(400).json({
                    title: "Add faculty error",
                    message: "You don't have permissions to perform this operation. Please check with the Administrator!"
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
    
    getOne: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async () => {
            await facultiesController.get(req.query.shortName)
            .then((faculty) => {
                res.status(200).json(faculty)
            })
            .catch((message) => {
                res.status(404).json({})
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

    getAll: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async () => {
            await facultiesController.getAll()
            .then((faculties) => {
                res.status(200).json(faculties)
            })
            .catch((message) => {
                res.status(404).json([])
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

    getAllData: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async () => {
            await facultiesController.getAllDataFaculty(req.query.id, req.query.type, req.query.pid)
            .then((faculties) => {
                res.status(200).json(faculties)
            })
            .catch((message) => {
                res.status(404).json([])
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

    //Only admin can edit the faculty
    //requires shortName as params and edited info in body
    edit: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            if(request.user.roleName === 'ADMIN') {
                await facultiesController.edit(req.query.shortName, req.body)
                .then((message) => {
                    res.status(200).json({
                        message: message
                    })
                })
                .catch((message) => {
                    res.status(400).json({
                        message: message
                    })
                })
            } else {
                res.status(400).json({
                    title: "Add faculty error",
                    message: "You don't have permissions to perform this operation. Please check with the Administrator!"
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

    //Only admin can delete the faculty
    //requires shortName as params
    remove: async function(req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async (request) => {
            if(request.user.roleName === 'ADMIN') {
                await facultiesController.remove(req.query.shortName)
                .then((message) => {
                    res.status(200).json({
                        message: message
                    })
                })
                .catch((message) => {
                    res.status(400).json({
                        message: message
                    })
                })
            } else {
                res.status(400).json({
                    title: "Add faculty error",
                    message: "You don't have permissions to perform this operation. Please check with the Administrator!"
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
    }
}