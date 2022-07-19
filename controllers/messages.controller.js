
const { first } = require("lodash")
const db = require("../models")

module.exports = {
    getMessages: async function(receiverId, promotionId) {
        return new Promise(async (resolve, reject) => {
            const messages = await db.Messages.findAll({
                where: {
                    receiverId: receiverId,
                    PromotionId: promotionId
                }
            })
            
            if(messages) {
                resolve(messages)
            } else {
                reject({})
            }
        })
    },

    getRead: async function(receiverId, promotionId) {
        return new Promise(async (resolve, reject) => {
            const messages = await db.Messages.findAll({
                where: {
                    receiverId: receiverId,
                    state: 'READ',
                    PromotionId: promotionId
                }
            })
            if(messages) {
                resolve(messages)
            } else {
                reject({})
            }
        })
    },

    getUnRead: async function(receiverId, promotionId) {
        return new Promise(async (resolve, reject) => {
            const messages = await db.Messages.findAll({
                where: {
                    receiverId: receiverId,
                    state: 'NOTREAD',
                    PromotionId: promotionId
                }
            })
            if(messages) {
                resolve(messages)
            } else {
                reject({})
            }
        })
    },

    add: async function(messageData) {
        return new Promise(async (resolve, reject) => {
            const message = new db.Messages(messageData)
            await message.save()
            .then(() => {
                resolve({})
            })
            .catch((message) => {
                reject(message)
            })
        })
    },

    delete: async function(messageId) {
        return new Promise(async (resolve, reject) => {
            const message = db.Messages.findOne({
                where: {
                    id: messageId
                }
            })
            message.destroy()
            .then(() => {
                resolve({})
            })
            .catch((message) => {
                reject(message)
            })
        })
    }
}