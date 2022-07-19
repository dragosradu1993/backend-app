const { reject } = require("lodash")
const messagesController = require("../../controllers/messages.controller")
const projectController = require("../../controllers/project.controller")
const promotionController = require("../../controllers/promotion.controller")
const secretariesController = require("../../controllers/secretaries.controller")
const studentController = require("../../controllers/student.controller")
const teacherController = require("../../controllers/teacher.controller")
const userController = require("../../controllers/user.controller")
const send = require("../mail/sender")
const userUtils = require("../user/utils/userUtils")


module.exports = {
    //add a secretary
    secretariesCRUD: {
        add: async function (req, res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'ADMIN' || request.user.roleName === 'SECRETARY') {
                    await secretariesController.add(req.query.pid, req.body)
                    .then((results) => {
                        res.status(200)
                        .json({
                            title: 'Add secretary data',
                            success: true,
                            data: results
                        })
                    })
                    .catch((message) => {
                        res.status(400)
                        .json({
                            title: 'Add secretary data error',
                            success: false,
                            message: message
                        })
                    })
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
    
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add secretary error',
                    success: false,
                    message: message
                })
            })
        },
    
        edit: async function (req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'ADMIN' || request.user.roleName === 'SECRETARY') {
                    await secretariesController.edit(req.query.id, req.body.newType)
                    .then((results) => {
                        res.status(200).json({
                            results: results
                        })
                    })
                    .catch((message) => {
                        res.status(400).json({
                            message:message
                        })
                    })
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
    
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add secretary error',
                    success: false,
                    message: message
                })
            })
        },
    
        get: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                await secretariesController.get(req.query.id)
                .then((results) => {
                    res.status(200).json({
                        results: results
                    })
                })
                .catch((message) => {
                    res.status(200).json({
                        message: message
                    })
                })
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add secretary error',
                    success: false,
                    message: message
                })
            })
        }
    },

    //Promotions
    promotionsCRUD: {
        add: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                    await promotionController.add(req.body)
                    .then((message) => {
                        res.status(200).json({
                            message: message
                        })
                    })
                    .catch((message) => {
                        res.status(400).json({
                            message:message
                        })
                    })
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })
        },

        get: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        },

        getAll: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        },

        edit: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        },

        remove: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                if(request.user.roleName === 'SECRETARY') {
                
                } else {
                    res.status(400).json({
                        message: `You don't have the necessary rights for this kind of task!`
                    })
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Add promotion error',
                    success: false,
                    message: message
                })
            })            
        }
    },

    studentsCRUD: {
        add: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                let results = {
                    notAdded: []
                }
                for(let i = 0; i< req.body.length; i++){
                    try {
                        const userProfile = await userController.getUserFullData(req.body[i].email,false)
                        if(userProfile) {
                           const student = await studentController.add(req.body[i], userProfile.Profile.id)
                           if(student) {
                                const studentFaculty = await studentController.linkToFaculty(student.id, req.body[i].FacultyId)
                                const studentPromotion = await studentController.linkToPromotion(student.id, req.body[i].PromotionId)
                           } else {
                                results.notAdded.push(req.body[i])
                           }
                        }
                    } catch(error) {
                        results.notAdded.push(req.body[i])
                    }
                }
                if(results.notAdded.length > 0) {
                    res.status(400).json({
                        results
                    })
                } else {
                    res.status(200).json({
                        data: []
                    })
                }
            }).catch((message) => {
                res.status(401)
                .json({
                    title: 'Error',
                    success: false,
                    message: message
                })
            })
        }
    },

    teachersCRUD: {
        add: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                let results = {
                    notAdded: []
                }
                for(let i = 0; i< req.body.length; i++){
                    try {
                        const userProfile = await userController.getUserFullData(req.body[i].email,false)
                        if(userProfile) {
                           const teacher = await teacherController.add(req.body[i], userProfile.Profile.id)
                           if(teacher) {
                                const teacherFaculty = await teacherController.linkToFaculty(teacher.id, req.body[i].FacultyId)
                                const teacherPromotion = await teacherController.linkToPromotion(teacher.id, req.body[i])

                                console.log(teacher)
                           } else {
                                results.notAdded.push(req.body[i])
                           }
                        }
                    } catch(error) {
                        results.notAdded.push(req.body[i])
                    }
                }
                if(results.notAdded.length > 0) {
                    res.status(400).json({
                        results
                    })
                } else {
                    res.status(200).json({
                        data: []
                    })
                }
            }).catch((message) => {
                res.status(401)
                .json({
                    title: 'Error',
                    success: false,
                    message: message
                })
            })
        }
    },

    projectsCRUD: {
        add: async function(req, res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                await projectController.getByStudentPromotion(req.body.StudentId,req.body.PromotionId)
                .then(() => {
                    res.status(400).json({message: 'Există deja o cerere trimisă de tine. Te rog așteaptă răspunsul din partea profesorului. Dacă acesta îți respinge tema, atunci vei putea alege alt profesor!'})
                })
                .catch(async () => {
                    try {
                        const teacher = await teacherController.getTeacherWithProfileAndUser(req.body.TeacherId)
                        const student = await studentController.getStudentWithProfileAndUser(req.body.StudentId)
                        if(teacher && student) {
                           await projectController.getByAllData(req.body)
                            .then((result) => {
                                res.status(400).json({message: 'Deja ai trimis o cerere către acest profesor!'})
                            })
                            .catch(async () => {
                                const project = await projectController.add(req.body)
                                if(project) {
                                    const newMessage = await messagesController.add({
                                        text: `Salut,\n\nStudentul ${student.Profile.lastName} ${student.Profile.firstName} a trimis către tine o solicitare pentru coordonare proiect. Intră în secțiunea Cererile mele sau în Dashboard pentru a vizualiza detaliile cererii.`,
                                        senderName: `${student.Profile.lastName} ${student.Profile.firstName}`,
                                        senderId: student.Profile.id,
                                        receiverId: teacher.Profile.id,
                                        state: 'NOTREAD'
                                    })
                                    //Send email notification
                                    await send(
                                        `<p>Salut,\n\nStudentul <b>${student.Profile.lastName} ${student.Profile.firstName}</b> a trimis către tine o solicitare pentru coordonare proiect.\nIntră în secțiunea Cererile mele sau în Dashboard pentru a vizualiza detaliile cererii.</p>\n\n<p>Cu drag,\n${req.body.appName}`,
                                        teacher.Profile.User.email,
                                        'Ai primit o nouă solicitare de coordonare proiect')
                                    .then((results) =>{
                                        res.status(200).json({message: `Cererea a fost trimisă cu succes!`})
                                    })
                                    .catch((message) => {
                                        res.status(400).json({message:message})
                                    })
                                } else {
                                    res.status(400).json({message: 'Ceva nu a mers bine!'})
                                }
                            }
                            )
                        }
                    }catch(error) {
                        res.status(400).json({message:error})
                    }   
                })

            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Error',
                    success: false,
                    message: message
                })
            })
            
        },

        getApproved: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                try {
                    const projects = await projectController.getApproved({
                        FacultyId: req.query.fid,
                        year: req.query.year,
                        type: req.query.type
                    })
                    res.status(200).json(projects)
                } catch (error) {
                    res.status(400).json({})
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Error',
                    success: false,
                    message: message
                })
            })
        },

        getNoProject: async function(req,res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                try {
                    const projects = await projectController.getNoProjectsStudents({
                        FacultyId: req.query.fid,
                        year: req.query.year,
                        type: req.query.type
                    })
                    res.status(200).json(projects)
                } catch (error) {
                    res.status(400).json({})
                }
            })
            .catch((message) => {
                res.status(401)
                .json({
                    title: 'Error',
                    success: false,
                    message: message
                })
            })
        },

        setProjectStatus: async function(req, res) {
            await userUtils.checkOAuthToken(req)
            .then(async (request) => {
                try {
                    let project
                    if(req.body.type === 'LICENTA') {
                        if(req.body.state === 'APPROVED') {
                            project = await projectController.approveBachelors(req.body)
                        }
                    }
                    if(req.body.type === 'MASTER') {
                        if(req.body.state === 'APPROVED') {
                            project = await projectController.approveDisertation(req.body)
                        } 
                    }

                    if(req.body.state === 'REJECTED') {
                        project = await projectController.reject(req.body)
                    }
                    if(project) {
                        res.status(200).json({
                            message: "Proiectul a fost setat!"
                        })
                    } else {
                        res.status(404).json({
                            message: "Ceva nu a mers bine"
                        })
                    }
    
                }catch(error) {
                    res.status(400).json({
                        message: message
                    })   
                }
            })
            .catch((message) => {
                res.status(401).json({
                    title: "User Info Error",
                    details: {
                        success: false,
                        message: message
                    }
                })            
            })
        },
    }

    

}