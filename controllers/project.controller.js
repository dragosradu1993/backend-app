
const db = require("../models")

module.exports = {
    getByStudent: async function(studentId) {
        return new Promise(async (resolve, reject) => {
            const project = await db.Projects.findOne({
                where: {
                    studentId : studentId
                }
            })
            if(project) {
                resolve(project)
            } else {
                reject({})
            }
        })
    },

    getByTeacher: async function(teacherId) {
        return new Promise(async (resolve, reject) => {
            const project = await db.Projects.findOne({
                where: {
                    teacherId : teacherId
                }
            })
            if(project) {
                resolve(project)
            } else {
                reject({})
            }
        })
    },

    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            const projects = await db.Projects.findAll({})
            if(projects) {
                resolve(projects)
            } else {
                reject([])
            }
        })
    },

    add: async function(project) {
        return new Promise(async (resolve, reject) => {
            const newProject = new db.Projects(project)
            await newProject.save()
            .then(() => {
                resolve(newPromotion)
            })
            .catch((message) => {
                reject(`Project cannot be created. The reason is: "${message}"`) 
            })
        })
    },

    edit: async function(id, editedProject) {
        return new Promise(async (resolve, reject) => {
            const project = await db.Projects.findOne({
                where: {
                    id: id
                }
            })
            project.name = editedProject.name
            project.studentId = editedProject.studentId
            project.teacherId = editedProject.teacherId 
            await project.save()
            .then(() => {
                resolve(project)
            })
            .catch((message) => {
                reject(`Promotion cannot be changed. The reason is: ${message}`)
            })
        })
    },

    delete: async function(id) {
        return new Promise(async (resolve, reject) => {
            const project = await db.Projects.findOne({
                where: {
                    id: id
                }
            })
            await project.destroy()
            .then(() => {
                resolve([])
            })
            .catch((message) => {
                reject(`Project cannot be deleted. The reason is: ${message}`)
            })
        })
    } 
}