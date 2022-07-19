
const { first } = require("lodash")
const db = require("../models")

module.exports = {
    getById: async function(id) {
        return new Promise(async (resolve, reject) => {
            const student = await db.Students.findOne({
                where: {
                    id: id
                }
            })
            if(student) {
                resolve(student)
            } else {
                reject({})
            }
        })
    },

    getByEmail: async function(email) {
        return new Promise(async (resolve, reject) => {
            const student = await db.Students.findOne({
                where: {
                    email: email
                }
            })
            if(student) {
                resolve(student)
            } else {
                reject({})
            }
        })
    },

    getByFirstName: async function(firstName) {
        return new Promise(async (resolve, reject) => {
            const student = await db.Students.findOne({
                where: {
                    firstName: first
                }
            })
            if(student) {
                resolve(student)
            } else {
                reject({})
            }
        })
    },

    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            const students = await db.Students.findAll({})
            if(students) {
                resolve(students)
            } else {
                reject([])
            }
        })
    },

    getStudentWithProfileAndUser: async function(studentId) {
        return new Promise(async (resolve, reject) => {
            const student = await db.Students.findOne({
                where: {
                    id: studentId
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

            if(student) {
                resolve(student)
            } else {
                reject({})
            }
        })
    },

    add: async function(student, profileId) {
        return new Promise(async (resolve, reject) => {
            let tempStudent = {}
            Object.keys(student).forEach(function(key){
                if (!(key === 'id')) {
                  tempStudent[key] = student[key]
                }
              });
            const newStudent = new db.Students(tempStudent)
            newStudent.ProfileId = profileId
            await newStudent.save()
            .then(() => {
                resolve(newStudent)
            })
            .catch((message) => {
                reject(`Student cannot be created. The reason is: "${message}"`) 
            })
        })
    },

    linkToPromotion: async function(studentId, promotionId) {
        return new Promise(async (resolve, reject) => {
            const newStudentPromotion = new db.Promotions_Students({StudentId:studentId, PromotionId:promotionId})
            await newStudentPromotion.save()
            .then(() => {
                resolve(newStudentPromotion)
            })
            .catch((message) => {
                reject({})
            })
        })
    },

    linkToFaculty: async function(studentId, facultyId) {
        return new Promise(async (resolve, reject) => {
            const newStudentFaculty = new db.Faculties_Students({StudentId:studentId, FacultyId:facultyId})
            await newStudentFaculty.save()
            .then(() => {
                resolve(newStudentFaculty)
            })
            .catch((message) => {
                reject({})
            })
        })
    },

    edit: async function(student, editedStudent) {
        return new Promise(async (resolve, reject) => {
            const student = await db.Students.findOne({
                where: {
                    id: id
                }
            })
            for(item in editedStudent) {
                student[item] = editedStudent[item]
            }
            await student.save()
            .then(() => {
                resolve(student)
            })
            .catch((message) => {
                reject(`Student cannot be changed. The reason is: ${message}`)
            })
        })
    },

    delete: async function(id) {
        return new Promise(async (resolve, reject) => {
            const student = await db.Students.findOne({
                where: {
                    id: id
                }
            })
            await student.destroy()
            .then(() => {
                resolve({})
            })
            .catch((message) => {
                reject(`Student cannot be deleted.The reason is: ${message}`)
            })
        })
    } 
}