
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

    getTeacherWithProfileAndUser: async function(teacherId) {
        return new Promise(async (resolve, reject) => {
            const teacher = await db.Teachers.findOne({
                where: {
                    id: teacherId
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

            if(teacher) {
                resolve(teacher)
            } else {
                reject({})
            }
        })
    },

    add: async function(teacher, profileId) {
        return new Promise(async (resolve, reject) => {
            let tempTeacher = {}
            Object.keys(teacher).forEach(function(key){
                if (!(key === 'id')) {
                    tempTeacher[key] = teacher[key]
                }
              });
            const newTeacher = new db.Teachers(tempTeacher)
            newTeacher.ProfileId = profileId
            await newTeacher.save()
            .then(() => {
                resolve(newTeacher)
            })
            .catch((message) => {
                reject(`Teacher cannot be created. The reason is: "${message}"`) 
            })
        })
    },

    linkToPromotion: async function(id, data) {
        return new Promise(async (resolve, reject) => {
            const newTeacherPromotion = new db.Promotions_Teachers({TeacherId: id, ...data})
            await newTeacherPromotion.save()
            .then(() => {
                resolve(newTeacherPromotion)
            })
            .catch((message) => {
                reject({})
            })
        })
    },

    linkToFaculty: async function(id, facultyId) {
        return new Promise(async (resolve, reject) => {
            const newTeacherFaculty = new db.Faculties_Teachers({TeacherId: id, FacultyId: facultyId})
            await newTeacherFaculty.save()
            .then(() => {
                resolve(newTeacherFaculty)
            })
            .catch((message) => {
                reject({})
            })
        })
    },

    setSlots: async function(data) {
        return new Promise(async (resolve, reject) => {
            const teacher = await db.Promotions_Teachers.findOne({
                where: {
                    TeacherId: data.TeacherId,
                    PromotionId: data.PromotionId
                }
            })
            teacher.availableSlotsBachelors = data.availableSlotsBachelors
            teacher.isCoordinatorBachelors = data.isCoordinatorBachelors
            teacher.isCoordinatorDisertation = data.isCoordinatorDisertation
            teacher.availableSlotsDisertations = data.availableSlotsDisertations
            
            await teacher.save()
            .then(() => {
                resolve({})
            })
            .catch((error) => {
                reject(error)
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