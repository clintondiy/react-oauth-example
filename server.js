<<<<<<< HEAD
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
// app.use(cors({
//   origin: process.env.API_HOST
// })) 

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
// app.use(session({ 
//   secret: process.env.SESSION_SECRET, 
//   resave: true, 
//   saveUninitialized: true 
// }))

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
 const ios = require('socket.io')(server)
//  const ioserver = io.listen(8000)
//  app.set('io', io)

// const io = require("socket.io")
// const ios = io.listen(8000)
=======
const expressApp = require("express")()
const fs = require("fs")
const https = require("https");
const secureServer = https.createServer({
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
}, expressApp);
const ios = require('socket.io')(secureServer);

secureServer.listen(8080, () => {
    console.log("secure server started at 8080");
})
>>>>>>> socket

let sequenceNumberByClient = new Map();

// event fired every time a new client connects:
ios.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

// sends each client its current sequence number
setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("seq-num", sequenceNumber);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}, 1000);

<<<<<<< HEAD
// use routes
// Direct request to auth router
// app.use('/api/oauth', authRouter);

server.listen(process.env.PORT || 8080, () => {
  console.log('Server listening on 8080')
})
=======
// ###### Simulate Client socket call
// Below code failed to connect if placed in client App.js
const io = require("socket.io-client");
const ioClient = io.connect("https://localhost:8080", {
    secure: true,
    reconnection: true,
    rejectUnauthorized: false
});

ioClient.on("seq-num", (msg) => console.info('Simulated client: ' + msg));
>>>>>>> socket
