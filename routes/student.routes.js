const express = require('express')
const router = express.Router()

const {
    add,
    addMultiple
} = require('../services/app/student.service')

router.route('/add').post(add)
router.route('/add-multiple').post(addMultiple)

module.exports = router