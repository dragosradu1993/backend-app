const { reject } = require("lodash")
const db = require("../../models")
const controller = require('../utils/controller.utils')

module.exports = {
    getProfile: async function(userId, userRole) {
        return new Promise(async (resolve, reject) => {
            let profile = await db.Profiles.findOne({
                where: {
                    userId: userId
                }
            })
            if(profile) {
                resolve(profile)
            } else {
                reject(`No profile exists for userId: ${userId}`)
            }
        })
    },

    add: async (profileData, userId, userRole) => {
        return new Promise(async (resolve, reject) => {
            const profile = new db.Profiles(profileData)
            profile.UserId = userId.slice()
            profile.save()
            .then((res) => {
                resolve(res)
            })
            .catch((message) => {
                reject(`Profile cannot be created! Reason is: '${message}'`)
            })
        })
    },

    edit: async function(newData, userId) {
        return new Promise(async (resolve, reject) => {
            const userProfile = await db.Profiles.findOne({
                where: {
                    UserId: userId
                }
            })
            if(!userProfile) reject(`Profile cannot be loaded! Reason: userId ${userId} does not exist!`)
            Object.keys(newData).map((key, index) => {
                userProfile[key] = newData[key]
            })
            await userProfile.save().then((res) => {
                resolve(res)
            })
            .catch(() => {
                reject(`Profile for userId ${userId} cannot be edited!`)
            })
        })
    },

    delete: async function(secretaryProfile) {
        return new Promise(async (resolve, reject) => {
            await secretaryProfile.destroy().then(() => {
                resolve("Profile has been deleted")
            })
            .catch(() => {
                reject("Profile cannot be deleted")
            })
        })
    }
}