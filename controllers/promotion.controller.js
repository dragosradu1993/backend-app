
const db = require("../models")

module.exports = {
    get: async function(year) {
        return new Promise(async (resolve, reject) => {
            const promotion = await db.Promotions.findOne({
                where: {
                    year: year
                }
            })
            if(promotion) {
                resolve(promotion)
            } else {
                reject({})
            }
        })
    },

    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            const promotions = await db.Promotions.findAll({})
            if(promotions) {
                resolve(promotions)
            } else {
                reject([])
            }
        })
    },

    getAllByFacultyId: async function(facultyId) {
        return new Promise(async (resolve, reject) => {
            const promotions = await db.Promotions.findAll({
                where: {
                    facultyId: facultyId
                },
                order: [
                    ['year', 'DESC'],
                ]
            })
            if(promotions) {
                resolve(promotions)
            } else {
                reject([])
            }
        })
    },

    add: async function(promotion) {
        return new Promise(async (resolve, reject) => {
            await this.setAllNotCurrent(promotion.FacultyId)
            .then(async () => {
                const newPromotion = new db.Promotions(promotion)
                newPromotion.isCurrent = true
                await newPromotion.save()
                .then(() => {
                    resolve(newPromotion)
                })
                .catch((message) => {
                    reject(`Promotion cannot be created. The reason is: "${message}"`) 
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    setAllNotCurrent: async function(facultyId) {
        return new Promise(async (resolve, reject) => {
            const promotions = await db.Promotions.findAll({
                where: {
                    FacultyId: facultyId
                }
            })
            if(promotions) {
                let count = 0
                for(let i=0; i<promotions.length;i++) {
                    const edited = await this.edit(promotions[i].id, {isCurrent: false})
                    if(edited) {
                        count++
                    }
                }
                if (count === promotions.length) {
                    resolve('Current Promotion: All promotions are set to false')
                } else {
                    reject('Current Promotion: Not all promotions are set to false')
                }
            } else {
                reject('There is no promotion added!')
            }
        })
    },

    edit: async function(id, newPromotion) {
        return new Promise(async (resolve, reject) => {
            const promotion = await db.Promotions.findOne({
                where: {
                    id: id
                }
            })
            if(newPromotion.hasOwnProperty('year')) {
                promotion.year = newPromotion.year
            }
            if(newPromotion.hasOwnProperty('isCurrent')) {
                promotion.isCurrent = newPromotion.isCurrent
            }
            await promotion.save()
            .then(() => {
                resolve(promotion)
            })
            .catch((message) => {
                reject(`Promotion cannot be changed. The reason is: ${message}`)
            })
        })
    },



    delete: async function(year) {
        return new Promise(async (resolve, reject) => {
            const promotion = await db.Promotions.findOne({
                where: {
                    year: year
                }
            })
            await promotion.destroy()
            .then(() => {
                resolve({statusCode: 200, data: `Promotion has been deleted`})
            })
            .catch((message) => {
                reject({statusCode: 400, data: `Promotion cannot be deleted.The reason is: ${message}`})
            })
        })
    } 
}