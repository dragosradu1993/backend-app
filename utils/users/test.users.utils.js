const userService = require("../../services/user.service")

module.exports = {
    generateEmailAddress: () => {
        return `testing+${Math.floor(Math.random()*10000)}@testing.com`
    },
    generatePassword: () => {
        return  `password${Math.floor(Math.random())*10000}`
    },
    generateUserRole: () => {
        const userRoles = Array('STUDENT', 'TEACHER', 'SECRETARY')
        let userRole = userRoles[Math.floor(Math.random()*userRoles.length)]
        return userRole
    },
    registerTestUsers: async (userRole) => {
        try {
            let req = {
                body: {
                    email: this.generateEmailAddress(),
                    password: this.generatePassword(),
                    userRole: userRole
                }
            }
            let user = await userService.register(req)
            return user
        } catch(error) {
            return -1
        }
    }
}