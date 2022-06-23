
const db = require("../models")
const controller = require('./utils/controller.utils')
const profileController = require('./profiles/profile.controller')
const userRoleController = require("./userRole.controller")
const { Op } = require("sequelize")

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
                            attributes: ['lastName', 'firstName', 'phoneNumber', 'profileImage']
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
                            exclude: ['id', 'UserId']
                        }},
                        {model: db.Profiles, attributes: {
                            exclude: ['id', 'UserId']
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

    getByRole: async function(userRole) {
        return new Promise(async (resolve, reject) => {
            const users = await db.UserRoles.findAll({
                where: {
                    roleName: userRole
                },
                include: [{
                    model: db.Users, 
                    attributes: ['email'],
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
            const newUser = new db.Users(userData)
            newUser.loginRetry = 0
            newUser.userBlocked = false
            const udata = userData
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

    changePassword: async function(req, user, fl) {
        return new Promise(async (resolve, reject) => {
            req.body.password = await controller.hashPwd(req.body.password)
            user.password = req.body.password
            if(fl === 'true')
                user.firstLogin = false
            user.save()
            .then(() => {
                resolve(user)
            })
            .catch((message) => {
                reject(`Password cannot be changed. The reason is: ${message}`)
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
            user.save()
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