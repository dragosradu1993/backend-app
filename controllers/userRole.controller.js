
const db = require("../models")
const controller = require('./utils/controller.utils')
const profileController = require('./profiles/profile.controller')

module.exports = {
    getRole: async function(userId) {
        return new Promise(async (resolve, reject) => {
            const userRole = await db.UserRoles.findOne({
                where: {
                    UserId: userId
                }
            })
            if(userRole) {
                resolve(userRole, 200)
            } else {
                reject(`No user roles assigned to userId : ${userId}`, 404)
            }
        })
    },

    addRole: async function(userId, userRole) {
        return new Promise(async (resolve, reject) => {
            const newUserRole = new db.UserRoles(userRole)
            newUserRole.UserId = userId
            await newUserRole.save()
            .then(() => {
                resolve(newUserRole)
            })
            .catch((message) => {
                reject(`User role cannot be created. The reason is: "${message}"`) 
            })
        })
    },

    editRole: async function(userId, newUserRole) {
        return new Promise(async (resolve, reject) => {
            const userRole = await db.UserRoles.findOne({
                where: {
                    UserId: userId
                }
            })
            userRole.roleName = newUserRole 
            await userRole.save()
            .then(() => {
                resolve("User role has been changed!", 200)
            })
            .catch((message) => {
                reject(`User role cannot be changed. The reason is: ${message}`, 400)
            })
        })
    },

    deleteRole: async function(userId) {
        return new Promise(async (resolve, reject) => {
            const userRole = await db.UserRoles.findOne({
                where: {
                    UserId: userId
                }
            })
            await userRole.destroy()
            .then(() => {
                resolve(`User role has been deleted`, 200)
            })
            .catch((message) => {
                reject(`User cannot be deleted.The reason is: ${message}`, 400)
            })
        })
    } 
}