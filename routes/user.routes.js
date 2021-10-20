const userService = require('../services/user.service')

const express = require('express')
const router = express.Router()
const { Sequelize } = require('../models')

const {
    registerUser,
    loginUser
} = require('../services/user.service')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)


module.exports = router