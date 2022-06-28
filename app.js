const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const upload = multer()
const bodyParser = require('body-parser');

var allowedOrigins = ['http://localhost:3002',
                      'http://192.168.68.56:3002', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static('resources'))

app.disable('x-powered-by')

const userRoutes = require('./routes/user.routes')
app.use(`/api-${process.env.NODE_ENV}/users`, userRoutes)

mockUserRoutes = require('./routes/mockUser.routes')
app.use(`/mock/users`, mockUserRoutes)

const uploadRoutes = require('./routes/upload.routes')
app.use(`/api-${process.env.NODE_ENV}/`, uploadRoutes)

const appInfoRoutes = require('./routes/app.routes')
app.use(`/api-${process.env.NODE_ENV}/`, appInfoRoutes)

const studentRoutes = require('./routes/student.routes')
app.use(`/api-${process.env.NODE_ENV}/students`, studentRoutes)

module.exports = app