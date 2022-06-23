const mockUserUtils = require("./mockUser.utils")

const user = {
    generateEmail: () => {
        return `testuser+${new Date().getUTCMilliseconds()}@test.com`
    },

    generatePassword: () => {
        let number = randomInteger(1000,9999)
        return `Testing${number}`
    }
    
}

module.exports = {
    generateUser: () => {
        return {
            email: user.generateEmail(),
            password: user.generatePassword()
        }
    }
}

function randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}