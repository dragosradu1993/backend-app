const userController = require('../../controllers/user.controller')
const userUtils = require('../user/utils/userUtils')
const mockUserUtils = require('./utils/mockUser.utils')


module.exports = {

    create: async (req, res) => {
        const request = mockUserUtils.requestGenerator(req.body)
        const pwd = request.body.password
        await userUtils.validateRegisterUser(request)
        .then(async() => {
            await userController.getUser(request.body.email)
            .then(() => {
                return res
                    .status(302)
                    .json({title: "New user", message: "User already exists!"})
            })
            .catch(async () => {
                console.log(request.body)
                await userController.add(request.body, true)
                .then((newUser) => {
                    newUser.password = pwd
                    return res.status(200).json({
                        newUser
                    })
                })
            })
        })
        .catch((message) => {
            return res.status(400).json({title: "New user error", message: message})
        })
    }
}