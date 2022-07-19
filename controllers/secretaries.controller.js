
const { first } = require("lodash")
const db = require("../models")

module.exports = {
    get: async function(profileId) {
        return new Promise(async (resolve, reject) => {
            const secretaryInfo = await db.Secretaries.findOne({
                where: {
                    ProfileId: profileId
                }
            })
            
            if(secretaryInfo) {
                resolve(secretaryInfo)
            } else {
                reject({})
            }
        })
    },

    edit: async function(profileId, newType) {
        return new Promise(async (resolve, reject) => {
            const secretaryInfo = await db.Secretaries.findOne({
                where: {
                    ProfileId: profileId
                }
            })
            secretaryInfo.type = newType
            secretaryInfo.save()
            .then(() => {
                resolve(secretaryInfo)
            })
            .catch((message) => {
                reject(message)
            })
        })        
    },

    add: async function(profileId,secretary) {
        return new Promise(async (resolve, reject) => {
            const newSecretary = new db.Secretaries(secretary)
            newSecretary.ProfileId = profileId
            await newSecretary.save()
            .then(() => {
                resolve(newSecretary)
            })
            .catch((message) => {
                reject(`Secretary data cannot be store. The reason is: "${message}"`) 
            })
        })
    },

    delete: async function(profileId) {
        return new Promise(async (resolve, reject) => {
            const secretary = await db.Secretaries.findOne({
                where: {
                    ProfileId: profileId
                }
            })
            await secretary.destroy()
            .then(() => {
                resolve({})
            })
            .catch((message) => {
                reject(`Secretary data cannot be deleted.The reason is: ${message}`)
            })
        })
    },
    
    getTeacherWithProfileAndUser: async function(secretaryId) {
        return new Promise(async (resolve, reject) => {
            const secretary = await db.Students.findOne({
                where: {
                    id: secretaryId
                },
                include: [
                    {
                        model: db.Profiles,
                        include: [
                            {
                                model: db.Users
                            }
                        ]
                    }
                ]
            })

            if(secretary) {
                resolve(secretary)
            } else {
                reject({})
            }
        })
    },
}