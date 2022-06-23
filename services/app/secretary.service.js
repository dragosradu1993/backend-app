const promotionController = require("../../controllers/promotion.controller")
const secretariesController = require("../../controllers/secretaries.controller")
const studentController = require("../../controllers/student.controller")
const userUtils = require("../user/utils/userUtils")


module.exports = {
    //add a secretary
    secretariesCRUD: {
        add: async function (req, res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'ADMIN' || request.user.roleName === 'SECRETARY') {
                    await secretariesController.add(req.query.pid, req.body)
                    .then((results) => {
                        res.status(200)
                        .json({
                            title: 'Add secretary data',
                            success: true,
                            data: results
                        })
                    })
                    .catch((message) => {
                        res.status(400)
                        .json({
                            title: 'Add secretary data error',
                            success: false,
                            message: message
                        })
                    })
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
    
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add secretary error',
                    success: false,
                    message: message
                })
            })
        },
    
        edit: async function (req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'ADMIN' || request.user.roleName === 'SECRETARY') {
                    await secretariesController.edit(req.query.id, req.body.newType)
                    .then((results) => {
                        res.status(200).json({
                            results: results
                        })
                    })
                    .catch((message) => {
                        res.status(400).json({
                            message:message
                        })
                    })
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
    
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add secretary error',
                    success: false,
                    message: message
                })
            })
        },
    
        get: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                await secretariesController.get(req.query.id)
                .then((results) => {
                    res.status(200).json({
                        results: results
                    })
                })
                .catch((message) => {
                    res.status(200).json({
                        message: message
                    })
                })
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add secretary error',
                    success: false,
                    message: message
                })
            })
        }
    },

    //Promotions
    promotionsCRUD: {
        add: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                    await promotionController.add(req.body)
                    .then((message) => {
                        res.status(200).json({
                            message: message
                        })
                    })
                    .catch((message) => {
                        res.status(400).json({
                            message:message
                        })
                    })
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })
        },

        get: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        },

        getAll: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        },

        edit: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        },

        remove: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        }
    }

    

}