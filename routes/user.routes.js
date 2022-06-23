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
    getUsersByRole
} = require('../services/user/user.service')

const secretariesService = require('../services/app/secretary.service')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/get/role').get(getUserRole)
router.route('/get/users-role').get(getUsersByRole)
router.route('/get/:id').get(getUserProfile)
//router.route('/get/:id/checkCredentials').get(checkCredentials)
router.route('/:id/changepwd').post(changePassword)
router.route('/get/admin/blocked-users').get(getBlockedUsers)
router.route('/post/admin/unblock-user').post(unblockUser)
router.route('/post/pwd-reset').post(passwordReset)


//profile
router.route('/edit/edit-profile').post(editProfile)

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




module.exports = router