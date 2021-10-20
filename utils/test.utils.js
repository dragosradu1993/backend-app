module.exports = {
    generateRandomUserCredentials: function() {
        const userRoles = Array('STUDENT', 'TEACHER', 'SECRETARY')
        let userRole = userRoles[Math.floor(Math.random()*userRoles.length)]
        
        const bodyCredentials = {
            email: `testing+${Math.floor(Math.random()*1000000)}@test.com`,
            password: "password"+Math.floor(Math.random()),
            userRole: userRole
        }
        return bodyCredentials
    }

    
}