const db = require('../../models')
const userUtils = require('../user/utils/userUtils')
const userController = require('../../controllers/user.controller')

const env = process.env.NODE_ENV
const config = require("../../config/config.json")[env]
const promotionUtils = require('../user/utils/promotion.utils')
const promotionController = require('../../controllers/promotion.controller')
const { response } = require('express')


module.exports = {
    addOne: async function(req, res) {
        promotionUtils.validateYear(req, res)
            .then(async () => {
                await promotionController.get(req.body.year)
                    .then(() => {
                        return res
                            .status(302)
                            .json({title: "New promotion", message: "Promotion already exists!"})
                    })
                    .catch(async () => {
                        await promotionController.add(req.body)
                            .then((response) => {
                            return res
                                .status(response.statusCode)
                                .json({title: "New promotion", message: "Promotion has been created!", data: response.data}) 
                        })
                    })
            })
            .catch((data) => {
                return res.status(response.statusCode).json({title: "New promotion error", message: response.data})
            })
    },
    
    getAll: async function(req, res) {
        await promotionController.getAll()
        .then((promotions) => {
            res.status(promotions.statusCode).json(promotions.data)
        })
        .catch((message) => {
            res.status(message.statusCode).json({
                title: "Promotion error",
                details: {
                    success: false,
                    message: message.data
                }
            })
        })
    },

    getOne: async function(req, res) {
        await promotionController.get(req.body.year)
        .then((promotion) => {
            res.status(promotion.statusCode).json(promotion.data)
        })
        .catch((message) => {
            res.status(message.statusCode).json({
                title: "Promotion error",
                details: {
                    success: false,
                    message: message.data
                }
            })
        })
    },

    edit: async function(req, res) {
        promotionUtils.validateYear(req)
            .then(async () => {
                await promotionController.get(req.params.pid)
                    .then(async (promotion) => {
                        await promotionController.edit(promotion.data.id, req.body.year)
                        .then((promotion) => {
                            return res
                                .status(promotion.statusCode)
                                .json({title: "Edit promotion", message: "Promotion has been changed!", data: promotion.data}) 
                        })
                        .catch((message) => {
                            return res
                                .status(message.statusCode)
                                .json({title: "Edit promotion error", message: message.data})
                        })
                    })
                    .catch(async () => {
                        return res.status(message.statusCode).json({title: "Edit promotion error", message: message.message})
                    })
            })
            .catch((message) => {
                return res.status(message.statusCode).json({title: "Edit promotion error", message: message.message})
            })        
    },

    deleteOne: async function(req, res) {
        await promotionController.delete(req.body.year)
        .then((message) => {
            return res
                .status(message.statusCode)
                .json({
                    title: "Delete promotion",
                    message: message
                })
        })
        .catch((message) => {
            return res
                .status(message.statusCode)
                .json({
                    title: "Delete promotion error",
                    message: message
                })            
        })
    }
}