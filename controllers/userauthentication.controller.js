const { reject } = require("lodash")
const db = require("../models")
const controller = require('./utils/controller.utils')

module.exports = {
    getUser: async function(email) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                resolve(user)
            } else {
                reject(`User with email address ${email} does not exist!`)
            }
        })
    },
    
    getUserRole: async function(id) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: { 
                    id: id
                },
                attributes: {exclude: ['password']}
            })
            if(user) {
                resolve(user)
            } else {
                reject(`User with user id ${id} does not exist!`)
            }
        })
    },

    getUserLoginRetry: async function(email) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                resolve(user.loginRetry)
            } else {
                reject(`User with email address ${email} doesn not exist!`)
            }
        })
    },

    addUser: async function(userData) {
        return new Promise(async (resolve, reject) => {
            userData.password = await controller.hashPwd(userData.password)
            const newUser = new db.Users(userData)
            newUser.loginRetry = 0
            newUser.userBlocked = false
            newUser.save()
            if(newUser) {
                resolve(newUser)
            } else{
                reject("User cannot be created!")
            }
        })
    },

    editPassword: async function(req, user) {
        req.body.newPassword = await controller.hashPwd(req.body.newPassword)
        user.password = req.body.newPassword
        user.save()
        return user
    },

    blockUser: async function(user) {
        user.userBlocked = true
        user.save()
        return user
    },

    unblockUser: async function(user) {
        user.userBlocked = false
        user.loginRetry = 0
        user.save()
        return user
    },

    deleteUser: async function(user) {
        await user.destroy()
    } 
}