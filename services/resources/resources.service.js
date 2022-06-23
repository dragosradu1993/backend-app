const db = require('../../models')
const userUtils = require('./utils/userUtils')
const userController = require('../../controllers/user.controller')

const env = process.env.NODE_ENV
const config = require("../../config/config.json")[env]
const promotionUtils = require('./utils/promotion.utils')
const promotionController = require('../../controllers/promotion.controller')
const { response } = require('express')


module.exports = {
    getLogo: async function(req,res) {
        
    }

}