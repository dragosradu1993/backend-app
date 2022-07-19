const express = require('express')
const router = express.Router()
const { Sequelize } = require('../models')

const {
    registerUser,
    loginUser,
    getUsers,
    getUserRole,
    getUserProfile,
    checkCredentials,
    changePassword,
    getBlockedUsers,
    unblockUser,
    passwordReset,
    editProfile,
    getUsersByRole,
    selfResetPassword,
    getStudentFullProfile,
    getTeacherFullProfile,
    setTeacherProjectSlots,
    getAdminDashboardData
} = require('../services/user/user.service')

const secretariesService = require('../services/app/secretary.service')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/get/role').get(getUserRole)
router.route('/get/users-role').get(getUsersByRole)
router.route('/get/:id').get(getUserProfile)
router.route('/:id/changepwd').post(changePassword)
router.route('/get/admin/blocked-users').get(getBlockedUsers)
router.route('/post/admin/unblock-user').post(unblockUser)
router.route('/post/pwd-reset').post(passwordReset)


//profile
router.route('/edit/edit-profile').post(editProfile)
router.route('/post/reset-password').post(selfResetPassword)

//Admin
router.route('/get/admin/dashboard-data').get(getAdminDashboardData)

//Secretaries
router.route('/secretaries/add').post(secretariesService.secretariesCRUD.add)
router.route('/secretaries/edit').post(secretariesService.secretariesCRUD.edit)
router.route('/secretaries/get').get(secretariesService.secretariesCRUD.get)


//Promotions
router.route('/promotion/add').post(secretariesService.promotionsCRUD.add)

//Promotions
router.route('/secretaries/promotions/get').get(secretariesService.promotionsCRUD.get)
router.route('/secretaries/promotions/get-all').get(secretariesService.promotionsCRUD.getAll)
router.route('/secretaries/promotions/add').post(secretariesService.promotionsCRUD.add)
router.route('/secretaries/promotions/:pid/edit').post(secretariesService.promotionsCRUD.edit)
router.route('/secretaries/promotions/delete').post(secretariesService.promotionsCRUD.remove)


//Students
router.route('/secretaries/students/add').post(secretariesService.studentsCRUD.add)
router.route('/students/get/full-profile').get(getStudentFullProfile)

//Teachers
router.route('/secretaries/teachers/add').post(secretariesService.teachersCRUD.add)
router.route('/teachers/get/full-profile').get(getTeacherFullProfile)
router.route('/teachers/set/available-slots').post(setTeacherProjectSlots)

//Projects
router.route('/projects/add-request').post(secretariesService.projectsCRUD.add)
router.route('/projects/set-request-status').post(secretariesService.projectsCRUD.setProjectStatus)
router.route('/projects/get/approved-projects').get(secretariesService.projectsCRUD.getApproved)
router.route('/projects/get/no-project-students').get(secretariesService.projectsCRUD.getNoProject)

module.exports = router