
const db = require("../models")
const controller = require('./utils/controller.utils')
const profileController = require('./profiles/profile.controller')
const userRoleController = require("./userRole.controller")
const { Op, Sequelize } = require("sequelize")

module.exports = {
    getUser: async function(email) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                resolve(user)
            } else {
                reject(`User with email address ${email} does not exists!`)
            }
        })
    },

    getUserFullData: async function(email, mockUser) {
        return new Promise(async (resolve, reject) => {
            let user
            if(mockUser) {
                user = await db.Users.findOne({
                    where: {
                        email: email
                    },
                    attributes: ['email', 'password'],
                    include: [
                        {
                            model: db.UserRoles,
                            attributes: ['roleName']
                        },
                        {
                            model: db.Profiles,
                            attributes: ['lastName', 'firstName', 'phoneNumber']
                        }
                    ]
                })
            } else {
                user = await db.Users.findOne({
                    where: {
                        email: email
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {model: db.UserRoles, attributes: {
                            exclude: ['UserId']
                        }},
                        {model: db.Profiles, attributes: {
                            exclude: ['UserId']
                        }}
                    ]
                })
            }

            if(user) {
                resolve(user)
            } else {
                reject(`User with email address ${email} does not exist!`)
            }
        })
    },

    getUserStudentFullData: async function(id) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {model:db.UserRoles},
                    {
                        model: db.Profiles,
                    }
                ]
            })

            if(user) {
                const educationForms = await db.Students.findAll({
                    where: {
                        ProfileId: user.Profile.id
                    }
                })
                if(educationForms) {
                    let projectType = [], countB = 0, countD = 0
                    for(let i = 0; i < educationForms.length; i++) {
                        if(educationForms[i].type === 'LICENTA' && countB < 1) {
                            projectType.push({title: 'Licență', key: 'type', value: 'LICENTA'})
                            countB++
                        }
                        if(educationForms[i].type === 'MASTER' && countD < 1) {
                            projectType.push({title: 'Master', key: 'type', value: 'MASTER'})
                            countD++
                        }
                    }
                    const facultyBachelors = await db.Faculties.findAll({
                        include: [
                            {
                                model: db.Students,
                                where: {
                                    type: 'LICENTA',
                                    ProfileId: user.Profile.id
                                },
                                include: [
                                    {
                                        model: db.Promotions,
                                        include: [
                                            { model: db.Projects},
                                            { model: db.Teachers, include: [{model: db.Profiles}]},
                                        ]
                                    }
                                ]
                            }
                        ],
                        order: [
                            [Sequelize.literal('`Students->Promotions->Promotions_Students`.`createdAt`'), 'DESC'],
                            [Sequelize.literal('`Students->Faculties_Students`.`createdAt`'), 'DESC'],
                        ] 
                        
                    })
                    const facultyDisertations = await db.Faculties.findAll({
                        include: [
                            {
                                model: db.Students,
                                where: {
                                    type: 'MASTER',
                                    ProfileId: user.Profile.id
                                },
                                include: [
                                    {
                                        model: db.Promotions,
                                        include: [
                                            { model: db.Projects},
                                            { model: db.Teachers, include: [{model: db.Profiles}]},
                                        ]
                                    }
                                ]
                            }
                        ],
                        order: [
                            [Sequelize.literal('`Students->Promotions->Promotions_Students`.`createdAt`'), 'DESC'],
                            [Sequelize.literal('`Students->Faculties_Students`.`createdAt`'), 'DESC'],
                        ] 
                    }) 
                    if(facultyBachelors || facultyDisertations) {
                        resolve( {
                            user: user,
                            educationForms: projectType,
                            facultyBachelors: facultyBachelors,
                            facultyDisertations: facultyDisertations
                        })    
                    } 
                } else {
                    resolve ( {
                        user: user
                    })
                }               
            } else {
                reject({})
            }
        })
    },

    getUserTeacherFullData: async function(id) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {model:db.UserRoles},
                    {
                        model: db.Profiles,
                    }
                ]
            })

            if(user) {
                const facultyData = await db.Faculties.findAll({
                    include: [
                        {
                            model: db.Teachers,
                            where: {
                                ProfileId: user.Profile.id
                            },
                            include: [
                                {
                                    model: db.Promotions,
                                    include: [
                                        { model: db.Projects },
                                        { model: db.Students, include: [{model: db.Profiles}]}
                                    ]
                                }
                            ]
                        }
                    ],
                    order: [
                        [Sequelize.literal('`Teachers->Promotions->Promotions_Teachers`.`createdAt`'), 'DESC'],
                        [Sequelize.literal('`Teachers->Faculties_Teachers`.`createdAt`'), 'DESC'],
                    ] 
                })

                if(facultyData) {
                    resolve( {
                        user: user,
                        faculty: facultyData
                    })     
                } else {
                    resolve ( {
                        user: user
                    })
                }               
            } else {
                reject({})
            }
        })
    },


    getUsers: async function(id) {
        return new Promise(async (resolve, reject) => {
            const users = await db.Users.findAll({
                where: {
                    id: {
                        [Op.ne]: id
                    }
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {model: db.UserRoles},
                    {model: db.Profiles}
                ]
            })
            if(users) {
                resolve(users)
            } else {
                reject ([])
            }
        })
    },

    getUsersLastXDays: async function(numberOfDays) {
        return new Promise(async (resolve, reject) => {
            if(numberOfDays === undefined) {
                reject('You have to set the number of days')
            } else {
                const users = await db.Users.findAll({
                    where: {
                        createdAt: {
                            [Op.gte]: new Date(new Date() - numberOfDays * (24 * 60 * 60 * 1000))
                        }
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
                
                if(users) {
                    resolve(users)
                } else {
                    reject([])
                }
            }
        })
    },

    getByRole: async function(userRole) {
        return new Promise(async (resolve, reject) => {
            const users = await db.UserRoles.findAll({
                where: {
                    roleName: userRole
                },
                include: [{
                    model: db.Users, 
                    attributes: ['id','email'],
                    include:[
                        {model: db.Profiles, include: [
                            {model: db.Students, required: false},
                            {model: db.Teachers, required: false},
                            {model: db.Secretaries, required: false},
                        ]}
                    ]
                }]
            })
            if(!users) {
                reject("There are no users added!")
            }
            resolve(users)
        })
    },


    getBlockedUsers: async function(id,roleName) {
        return new Promise(async (resolve, reject) => {
            if(roleName === "ADMIN") {
                const users = await db.Users.findAll({
                    where: {
                        userBlocked: true
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {model: db.UserRoles},
                        {model: db.Profiles}
                    ]
                })
                if(users) {
                    resolve(users)
                } else {
                    reject ([])
                }
            } else {
                reject("You don't have access for this kind of request!")
            }
        })
    },

    getProfile: async function(id, exclude) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: [exclude]
                },
                include: [
                    {model: db.Profiles, attributes: { exclude: ['UserId']}},
                    {model: db.UserRoles, attributes: { exclude: ['id','UserId']}}
                ]
            })
            if(user) {
                try {
                    resolve(user)
                } catch(error) {
                    reject(error)
                }
            } else {
                reject(`User with id ${id} does not exist!`)
            }
        })        
    },

    getUserLoginRetry: async function(email) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                resolve(user.loginRetry)
            } else {
                reject(`User with email address ${email} does not exist!`)
            }
        })
    },

    increaseLoginRetry: async function(email) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                user.loginRetry = user.loginRetry + 1
                await user.save()
                resolve(true)
            } else {
                reject('No user found')
            }
        })
    },

    resetLoginRetry: async function(email) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                user.loginRetry = 0
                user.userBlocked = false
                resolve(true)
            } else {
                reject('No user found')
            }
        })
    },

    setBlockUser: async function(email) {
        return new Promise(async (resolve, reject) => {
            const user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                user.userBlocked = true
                await user.save()
                resolve(true)
            } else {
                reject('No user found')
            }
        })
    },

    add: async function(userData, mockUser) {
        return new Promise(async (resolve, reject) => {
            userData.password = await controller.hashPwd(userData.password)
            const newUser = db.Users.build(userData)
            newUser.loginRetry = 0
            newUser.userBlocked = false
            const udata = userData
            newUser.state = 'FIRST-LOGIN'
            await newUser.save().then(async (res) => {
                await userRoleController.addRole(newUser.id, udata)
                await profileController.add(userData.profile, newUser.id, userData.roleName)
                .then(async () => {
                    await this.getUserFullData(newUser.email, mockUser)
                    .then((user) => {
                        resolve(user)
                    })
                })
                .catch((message) => {
                    reject(`User cannot be created. The reason is: "${message}"`) 
                })
            })
            .catch((message) => {
                reject(`User cannot be created! ${message}`)
            })
        })
    },

    changePassword: async function(req, user, selfResetPassword) {
        return new Promise(async (resolve, reject) => {
            req.body.password = await controller.hashPwd(req.body.password)
            user.password = req.body.password
            user.loginRetry = 0
            if(selfResetPassword) {
                user.state = 'AFTER-RESET-PASSWORD'
            } else {
                user.state = 'OK'
            }
            user.save()
            .then(() => {
                resolve(user)
            })
            .catch((message) => {
                reject(`Password cannot be changed. The reason is: ${message}`)
            })
        })
    },

    resetLoginRetry: async function(user) {
        return new Promise(async (resolve, reject) => {
            user.loginRetry = 0
            user.save()
            .then(() => {
                resolve('Login retry has been reseted!')
            })
            .catch((error) =>{
                reject(error)
            })
        })
    },

    blockUser: async function(user) {
        return new Promise(async (resolve, reject) => {
            user.userBlocked = true
            user.save()
            .then(() => {
                resolve(200, `User has been blocked`)
            })
            .catch((message) => {
                reject(400, `User cannot be blocked. The reason is ${message}`)
            })
        })
        
    },

    unblockUser: async function(user) {
        return new Promise(async (resolve, reject) => {
            user.userBlocked = false
            user.loginRetry = 0
            await user.save()
            .then(() => {
                resolve(200, `User has been unblocked`)
            })
            .catch((message) => {
                reject(400, `User cannot be unblocked. The reason is ${message}`)
            })
        })
    },

    deleteUser: async function(user) {
        return new Promise(async (resolve, reject) => {
            await user.destroy()
            .then(() => {
                resolve(200, `User has been deleted`)
            })
            .catch((message) => {
                reject(400, `User cannot be deleted.The reason is: ${message}`)
            })
        })
    },

    getUserRole: async function(user) {
        return new Promise(async (resolve, reject) => {
            let userRole
            if(user) {
                userRole = await db.UserRoles.findOne({
                    where: {
                        userId: user
                    }
                })
            }
            if(userRole) {
                resolve(userRole.roleName)
            } else {
                reject('No user role found')
            }
        })
    }
}