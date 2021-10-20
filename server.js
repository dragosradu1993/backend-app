const app = require('./app')
const db = require('./models')
const env = process.env.NODE_ENV
const config = require("../backend-licenta/config/config.json")[env]

db.sequelize.sync({force: true}).then(() => {
    app.listen(config.PORT, () => {
        console.log(`listening on: http://localhost:${config.PORT}`)
    })
})