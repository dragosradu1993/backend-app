const app = require('./app')
const db = require('./models')
const env = process.env.NODE_ENV
const config = require("../backend-licenta/config/config.json")[env]
const uploadUtils = require('./services/upload/utils/upload.utils')
const fs = require('fs')
const https = require('https')
const userUtils = require('./services/user/utils/userUtils')


db.sequelize.sync({}).then(() => {
    uploadUtils.initUploadDirectories(env)
    userUtils.generateFile(10)
    https.createServer({
        cert: fs.readFileSync('./cert/cert.pem'),
        key: fs.readFileSync('./cert/key.pem')
    }, app).listen(config.PORT, () => {
        console.log(`listening on: https://localhost:${config.PORT}`)
    })
})