
const db = require("../models")

module.exports = {
    get: async function (shortName) {
        return new Promise(async (resolve, reject) => {
            const faculty = await db.Faculties.findOne({
                where: {
                    shortName: shortName
                }
            })
            if (faculty) {
                resolve(faculty)
            } else {
                reject({})
            }
        })
    },

    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            const faculties = await db.Faculties.findAll({})
            if (faculties) {
                resolve(faculties)
            } else {
                reject([])
            }
        })
    },

    getAllDataFaculty: async function(id, type, profileId) {
        return new Promise(async (resolve, reject) => {
            let models
            if(type === 'SECRETARY') {
                models = [
                    {model: db.Secretaries, as: 'secretaries', include: [{model: db.Profiles, include: [{model:db.Users, attributes: ['email']}]}], where: {
                        ProfileId: profileId
                    }},
                    {model: db.Promotions, include: [
                        {model: db.Students, include: [
                            {model: db.Profiles, include: [
                                {model: db.Users, attributes: ['id', 'email']}
                            ]}
                        ]},
                        {model: db.Teachers,  include: [
                            {model: db.Profiles, include: [
                                {model: db.Users, attributes: ['id', 'email']}
                            ]}
                        ]},
                        {model: db.Projects}
                    ] }
                ]
            } else {
                models = [
                    {model: db.Promotions, include: [
                        {model: db.Students},
                        {model: db.Teachers},
                        {model: db.Projects}
                    ]}
                ]
            }
            const facultyData = await db.Faculties.findOne({
                where: {
                    id: id
                },
                include: models
            })
            if(facultyData) {
                resolve(facultyData)
            } else {
                reject({})
            }
            
        })
    },

    add: async function(faculty) {
        return new Promise(async (resolve, reject) => {
            const newFaculty = new db.Faculties(faculty)
            await newFaculty.save()
                .then(() => {
                    resolve(newFaculty)
                })
                .catch((message) => {
                    reject(`This faculty cannot be created. The reason is: "${message}"`)
                })
        })
    },

    edit: async function(shortName, editedFaculty) {
        return new Promise(async (resolve, reject) => {
            const faculty = await db.Faculties.findOne({
                where: {
                    shortName: shortName
                }
            })
            if(faculty) {
                Object.keys(editedFaculty).map((key, index) => {
                    faculty[key] = editedFaculty[key]
                })
                await faculty.save()
                    .then(() => {
                        resolve(faculty)
                    })
                    .catch((message) => {
                        reject(`This faculty cannot be changed. The reason is: ${message}`)
                    })
            } else {
                reject(`No faculty found`)
            }

        })
    },

    remove: async function(shortName) {
        return new Promise(async (resolve, reject) => {
            const faculty = await db.Faculties.findOne({
                where: {
                    shortName: shortName
                }
            })
            if(faculty) {
                await faculty.destroy()
                .then(() => {
                    resolve(`The faculty has been deleted`)
                })
                .catch((message) => {
                    reject(`The faculty cannot be deleted.The reason is: ${message}`)
                })
            } else {
                reject(`No faculty found`)
            }

        })
    }
}