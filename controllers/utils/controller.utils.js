const bcrypt = require('bcrypt')

module.exports = {
    hashPwd: async function(pwd) {
        return await bcrypt.hash(pwd, 11)
    }
}