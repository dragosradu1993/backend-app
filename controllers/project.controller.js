
const { Op } = require("sequelize")
const db = require("../models")

module.exports = {
    getByStudentPromotion: async function(studentId, promotionId) {
        return new Promise(async (resolve, reject) => {
            const projects = await db.Projects.findOne({
                where: {
                    StudentId: studentId,
                    PromotionId: promotionId,
                    [Op.or]: [
                       { state: 'PENDING' },
                        { state: 'APPROVED' }
                    ]
                },
            })
            if(projects) {
                resolve(projects)
            } else {
                reject({})
            }
        }) 
    },

    getByAllData: async function(data) {
        return new Promise(async (resolve,reject) => {
            const project = await db.Projects.findOne({
                where: {
                    FacultyId: data.FacultyId,
                    StudentId: data.StudentId,
                    TeacherId: data.TeacherId,
                    PromotionId: data.PromotionId,
                    type: data.type
                }})
                if(project) {
                    resolve(project)
                } else {
                    reject({})
                }
            })
        },

    getApproved: async function(data) {
        return new Promise(async (resolve, reject) => {
            const promotion = await db.Promotions.findOne({
                where: {
                    year: data.year
                }
            })
            if(promotion) {
                const projects = await db.Projects.findAll({
                    where: {
                        FacultyId: data.FacultyId,
                        PromotionId: promotion.id,
                        type: data.type,
                        state: 'APPROVED'
                    },
                    include: [
                        {model: db.Students, include: [{model: db.Profiles}]},
                        {model: db.Teachers, include: [{model: db.Profiles}]}
                    ]
                })
                if(projects) {
                    resolve(projects)
                } else {
                    reject([])
                }
            } else {
                reject({})
            }

        })

    },

    getNoProjectsStudents: async function(data) {
        return new Promise(async (resolve, reject) =>{
            const promotion = await db.Promotions.findOne({
                where: {
                    year: data.year
                }
            })
            if(promotion) {
                const studentsPromotions = await db.Promotions_Students.findAll({
                    where: {
                        PromotionId: promotion.id
                    },

                })
                let respStudents = [], project, student
                for(let j = 0; j<studentsPromotions.length;j++) {
                    student = await db.Students.findOne({
                        where: {
                            id: studentsPromotions[j].StudentId,
                            type: data.type
                        },
                        include: [
                            {model: db.Profiles, include: [{model: db.Users}]},
                        ]
                    })
                    if(student) {
                        const project = await db.Projects.findOne({
                            where: {
                                StudentId: student.id,
                                PromotionId: promotion.id,
                                type: data.type,
                                state: 'APPROVED'
                            }
                        })
                        if(!project) {
                            respStudents.push(student)
                        }
                    }

                }

                if(respStudents) {
                    resolve(respStudents)
                } else {
                    reject([])
                }
            } else {
                reject({})
            }

        })
    },

    getByTeacher: async function(teacherId, promotionId) {
        return new Promise(async (resolve, reject) => {
            const projects = await db.Projects.findAll({
                where: {
                    TeacherId: studentId,
                    PromotionId: promotionId
                },
            })
            if(projects) {
                resolve(projects)
            } else {
                reject({})
            }
        }) 
    },

    approveBachelors: async function(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const teacher_promotions = await db.Promotions_Teachers.findOne({
                    where: {
                        TeacherId: data.teacherId,
                        PromotionId: data.promotionId
                    }
                })
                if(teacher_promotions.availableSlotsBachelors === 0) {
                    reject('Nu mai poți accepta cereri pentru că ai atins numărul de locuri!')
                } else {
                    const project = await db.Projects.findOne({
                        where: {
                            id: data.id
                        }
                    })
                    teacher_promotions.availableSlotsBachelors = teacher_promotions.availableSlotsBachelors - 1
                    teacher_promotions.save()
                    project.state = data.state
                    await project.save()
                    resolve(project)
                }
            } catch(error) {
                reject(error)
            }
    })},

    approveDisertation: async function(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const teacher_promotions = await db.Promotions_Teachers.findOne({
                    where: {
                        TeacherId: data.teacherId,
                        PromotionId: data.promotionId
                    }
                })
                if(teacher_promotions.availableSlotsDisertations === 0) {
                    reject('Nu mai poți accepta cereri pentru că ai atins numărul de locuri!')
                } else {
                    const project = await db.Projects.findOne({
                        where: {
                            id: data.id
                        }
                    })
                    teacher_promotions.availableSlotsDisertations = teacher_promotions.availableSlotsDisertations - 1
                    teacher_promotions.save()
                    project.state = data.state
                    await project.save()
                    resolve(project)
                }
            } catch(error) {
                reject(error)
            }
            
    })},

    reject: async function(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const project = await db.Projects.findOne({
                    where: {
                        id: data.id
                    }
                })
                project.state = data.state
                project.rejectReason = data.rejectReason
                await project.save()
                resolve(project)
            } catch (error) {
                reject(error)
            }
        })
    },

    getByPromotionId: async function(promotionId) {
        return new Promise(async (resolve, reject) => {
            const projects = await db.Projects.findAll({
                where: {
                    PromotionId: promotionId
                },
                include: [
                    {
                        model: db.Students,
                        include: [
                            {
                                model: db.Profiles,
                                include: [
                                    {
                                        model: db.Users,
                                        attributes: ['id', 'email']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: db.Teachers,  
                        include: [
                            {
                                model: db.Profiles,
                                include: [
                                    {
                                        model: db.Users,
                                        attributes: ['id', 'email']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            if(projects) {
                resolve(projects)
            } else {
                reject([])
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
                resolve(newProject)
            })
            .catch((message) => {
                reject(message) 
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
            project.TeacherId = editedProject.studentId
            project.StudentId = editedProject.teacherId
            project.PromotionId = editedProject.promotionId
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