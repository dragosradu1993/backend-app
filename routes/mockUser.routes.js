const express = require('express')
const router = express.Router()

const {
    create,
} = require('../services/mock-user/mockUser.service')

router.route('/create').post(create)

module.exports = router