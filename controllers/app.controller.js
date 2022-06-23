
const db = require("../models")
const controller = require('./utils/controller.utils')
const profileController = require('./profiles/profile.controller')
const userRoleController = require("./userRole.controller")

module.exports = {
    get: async function() {
        return new Promise(async (resolve, reject) => {
            const appInfo = await db.App.findAll({})
            if(appInfo.length != 0) {
                resolve(appInfo[0])
            } else {
                reject(`App information does not exist! The app is not set yet!`)
            }
        })
    },

    getIsSet: async function() {
        return new Promise(async (resolve, reject) => {
            const appInfo = await db.App.findAll({})
            if(appInfo.length != 0) {
                resolve(appInfo[0].isSet)
            } else {
                reject(false)
            }
        })
    },

    add: async function(appData) {
        return new Promise(async (resolve, reject) => {
            const appInfo = new db.App(appData)
            appInfo.isSet = true
            await appInfo.save()
            .then(async (res) => {
                resolve(res)
            })
            .catch((message) => {
                console.log(message)
                reject(`App info cannot be saved. The reason is: "${message}"`) 
            })
        })
    },

    edit: async function(newAppInfo, appInfo) {
        return new Promise(async (resolve, reject) => {
            for(let item in newAppInfo) {
                appInfo[item] = newAppInfo[item]
            }
            appInfo.save()
            .then(() => {
                resolve(appInfo)
            })
            .catch((message) => {
                reject(400, `App information cannot be changed. The reason is: ${message}`)
            })
        })
    },

    delete: async function(app) {
        return new Promise(async (resolve, reject) => {
            await app.destroy()
            .then(() => {
                resolve(`App information has been deleted`)
            })
            .catch((message) => {
                reject(`App information cannot be deleted.The reason is: ${message}`)
            })
        })
    } 
}