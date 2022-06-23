
const { first } = require("lodash")
const db = require("../models")

module.exports = {
    getById: async function(id) {
        return new Promise(async (resolve, reject) => {
            const teacher = await db.Teachers.findOne({
                where: {
                    id: id
                }
            })
            if(teacher) {
                resolve(teacher)
            } else {
                reject({})
            }
        })
    },

    getByEmail: async function(email) {
        return new Promise(async (resolve, reject) => {
            const teacher = await db.Teachers.findOne({
                where: {
                    email: email
                }
            })
            if(teacher) {
                resolve(teacher)
            } else {
                reject({})
            }
        })
    },

    getByFirstName: async function(firstName) {
        return new Promise(async (resolve, reject) => {
            const teacher = await db.Teachers.findOne({
                where: {
                    firstName: firstName
                }
            })
            if(teacher) {
                resolve(teacher)
            } else {
                reject({})
            }
        })
    },

    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            const teachers = await db.Teachers.findAll({})
            if(teachers) {
                resolve(teachers)
            } else {
                reject([])
            }
        })
    },

    add: async function(teacher) {
        return new Promise(async (resolve, reject) => {
            const newTeacher = new db.Teachers(student)
            await newTeacher.save()
            .then(() => {
                resolve(newTeacher)
            })
            .catch((message) => {
                reject(`Teacher cannot be created. The reason is: "${message}"`) 
            })
        })
    },

    edit: async function(id, editedTeacher) {
        return new Promise(async (resolve, reject) => {
            const teacher = await db.Teachers.findOne({
                where: {
                    id: id
                }
            })
            teacher.firstName = editedTeacher.firstName
            teacher.lastName = editedTeacher.lastName
            teacher.email = editedTeacher.email
            teacher.phoneNumber = editedTeacher.phoneNumber
            teacher.department = editedTeacher.department

            await teacher.save()
            .then(() => {
                resolve(teacher)
            })
            .catch((message) => {
                reject(`Teacher cannot be changed. The reason is: ${message}`)
            })
        })
    },

    delete: async function(id) {
        return new Promise(async (resolve, reject) => {
            const teacher = await db.Teachers.findOne({
                where: {
                    id: id
                }
            })
            await teacher.destroy()
            .then(() => {
                resolve({})
            })
            .catch((message) => {
                reject(`Teacher cannot be deleted.The reason is: ${message}`)
            })
        })
    } 
}