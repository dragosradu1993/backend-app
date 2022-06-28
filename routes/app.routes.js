const express = require('express')
const router = express.Router()
const { Sequelize } = require('../models')

const {
    add,
    edit,
    getInfo,
    getInfoIsSetApp,
    deleteInfo,
    getAppMenu,
    getAppDashboard,
    getAllUsersData,
    getBlockedUsers,
    getUsersLastXDays
} = require('../services/app/app.service')

const student = require('../services/app/student.service')
const faculty = require('../services/app/faculty.service')
const { route } = require('./user.routes')

router.route('/app-info/add').post(add)
router.route('/app-info/edit').post(edit)
router.route('/app-info/get').get(getInfo)
router.route('/app-info/getIsSetApp').get(getInfoIsSetApp)
router.route('/app-info/delete/:id').delete(deleteInfo)

router.route('/app-info/get/main-menu').get(getAppMenu)
router.route('/app-info/get/dashboard').get(getAppDashboard)
router.route('/app-info/get/all-user-data').get(getAllUsersData)
router.route('/app-info/get/get-blocked-users').get(getBlockedUsers)
router.route('/app-info/get/users-last-days').get(getUsersLastXDays)


//Students
router.route('/app/students/add').post(student.add)

//Faculties
router.route('/app/faculties/add').post(faculty.add)
router.route('/app/faculties/get').get(faculty.getOne)
router.route('/app/faculties/get-all').get(faculty.getAll)
router.route('/app/faculties/get-all-data').get(faculty.getAllData)
router.route('/app/faculties/edit').post(faculty.edit)
router.route('/app/faculties/delete').post(faculty.remove)


module.exports = router