module.exports = {
    generateRandomUserCredentials: function() {
        const userRoles = Array('ADMIN', 'SECRETARY')
        let userRole = userRoles[Math.floor(Math.random()*userRoles.length)]
        
        const bodyCredentials = {
            email: `testing+${Math.floor(Math.random()*1000000)}@test.com`,
            password: "password"+Math.floor(Math.random()),
            roleName: userRole,
            profile: {
                firstName: `Test FirstName+${Math.floor(Math.random())}`,
                lastName: `Test LastName+${Math.floor(Math.random())}`,
                phoneNumber: '0722222222'
            }
        }
        return bodyCredentials
    }

    
}