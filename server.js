const app = require('./app')
const db = require('./models')
const env = process.env.NODE_ENV
const config = require("../backend-licenta/config/config.json")[env]
const uploadUtils = require('./services/upload/utils/upload.utils')

db.sequelize.sync({}).then(() => {
    uploadUtils.initUploadDirectories(env)
    app.listen(config.PORT, () => {
        console.log(`listening on: http://localhost:${config.PORT}`)
    })
})