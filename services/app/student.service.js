const studentController = require("../../controllers/student.controller")
const userUtils = require("../user/utils/userUtils")


module.exports = {
    //add a student
    add: async function (req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async () => {
            await studentController.add(req.body)
            .then((results) => {
                res.status(200)
                .json({
                    title: 'Add students',
                    success: true,
                    data: results
                })
            })
            .catch((message) => {
                res.status(400)
                .json({
                    title: 'Add students error',
                    success: false,
                    message: message
                })
            })
        })
        .catch((message) => {
            res.status(401)
            .json({
                title: 'Add students error',
                success: false,
                message: message
            })
        })
    },

    addMultiple: async function (req, res) {
        await userUtils.checkOAuthToken(req)
        .then(async () => {
            let studentData
            req.body.forEach(async (student,index,students) => {
                await studentController.add(student)
                .then(() => {
                    console.log(`student at index ${index} has been added`)
                })
                .catch(() => {
                    students.splice(index, 1)
                })
                studentData = students
            })
            if(studentData.length === 0) {
                res.status(200)
                .json({
                    title: 'Add students',
                    success: true,
                    message: 'All students have been added'
                })
            } else {
                res.status(250)
                .json({
                    title: 'Add students',
                    success: false,
                    message: 'Not all students have been added',
                    students: studentData
                })
            }
        })
        .catch((message) => {
            res.status(401)
            .json({
                title: 'Add students error',
                success: false,
                message: message
            })
        })
    }




}