const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

const userRoutes = require('./routes/user.routes')
app.use(`/api-${process.env.NODE_ENV}/users`, userRoutes)

module.exports = app