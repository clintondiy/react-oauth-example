require('dotenv').config()
const cors = require('cors')
const express = require("express")
const fs = require('fs')
const https = require('https')
const passport = require('passport')
const path = require("path")
const session = require('express-session')
const app = express()

const authRouter = require('./lib/auth.router')
const passportInit = require('./lib/passport.init')

const certOptions = {
  key: fs.readFileSync(path.resolve('ssl/server.key')),
  cert: fs.readFileSync(path.resolve('ssl/server.crt'))
}

const server = https.createServer(certOptions, app)

// Setup for passport and to accept JSON objects
app.use(express.json());
app.use(passport.initialize())
passportInit()

// Accept requests from the client
app.use(cors({
  origin: process.env.API_HOST
})) 

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true 
}))

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = require('socket.io')(server)
app.set('io', io)

// use routes
// Direct request to auth router
app.use('/api/oauth', authRouter);

server.listen(process.env.PORT || 8080, () => {
  console.log('Server listening on 8080')
})