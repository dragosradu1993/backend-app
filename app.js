const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser');

var allowedOrigins = ['https://localhost:4000',
                      'https://192.168.68.56:4000',
                      'https://localhost:4001',
                      'https://192.168.68.56:4001',
                      'https://localhost:4002',
                      'https://192.168.68.56:4002',
                    ];
                    /*
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const message = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
*/
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static('resources'))

app.use(helmet())
app.use(
  helmet.frameguard({
    action: "deny",
  })
 )
 app.use(helmet.hidePoweredBy())
 app.use(helmet({ crossOriginResourcePolicy: { policy: "same-origin" } }))
app.use(helmet.contentSecurityPolicy())
app.use(helmet.crossOriginEmbedderPolicy())
app.use(helmet.crossOriginOpenerPolicy())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.originAgentCluster())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())

const userRoutes = require('./routes/user.routes')
app.use(`/api-${process.env.NODE_ENV}/users`, userRoutes)

mockUserRoutes = require('./routes/mockUser.routes')
app.use(`/mock/users`, mockUserRoutes)

const uploadRoutes = require('./routes/upload.routes')
app.use(`/api-${process.env.NODE_ENV}/`, uploadRoutes)

const appInfoRoutes = require('./routes/app.routes')
app.use(`/api-${process.env.NODE_ENV}/`, appInfoRoutes)


module.exports = app
