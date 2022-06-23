const express = require('express')
const router = express.Router()
const { Sequelize } = require('../models')

const uploadFile = require('../controllers/upload.controller')

router.route('/upload').post(uploadFile.upload)
router.route('/files').get(uploadFile.getListFiles)
router.route('/files/:type').get(uploadFile.getLogoFileInfo)
router.route('/files/:name').get(uploadFile.download)

module.exports = router