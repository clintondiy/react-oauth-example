require('dotenv').config()
const config = require("config")
const cors = require('cors')
const express = require("express")
const fs = require('fs')
const https = require('https')
const mongoose = require("mongoose")
const passport = require('passport')
const path = require("path")
const session = require('express-session')
const socketio = require('socket.io')
const app = express()

const authRouter = require('./lib/auth.router')
const passportInit = require('./lib/passport.init')
// const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config')
// console.log(CLIENT_ORIGIN);

const certOptions = {
  key: fs.readFileSync(path.resolve('ssl/server.key')),
  cert: fs.readFileSync(path.resolve('ssl/server.crt'))
}

const server = https.createServer(certOptions, app)

//api
const auth = require("./routes/api/auth");
const configs = require("./routes/api/configs");
const files = require("./routes/api/files");
const image = require("./routes/api/image");
const infos = require("./routes/api/infos");
const profiles = require("./routes/api/profiles");
const roles = require("./routes/api/roles");
const users = require("./routes/api/users");
// const test = require("./routes/api/common/mail");

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
const io = socketio(server)
app.set('io', io)
console.log('loaded io')

// Connect to Mongo DB
mongoose
  .connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    ssl: false,
    sslValidate: false,
    user: config.get('Mongo.user'),
    pass: config.get('Mongo.pwd'),
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo db connected"));

/*
//test(
  "TEST for Marshmallow",
  "clintondiy@gmail.com",
  "receiptEmailTemplate.html"
);
*/

// use routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profiles", profiles);
app.use("/api/files", files);
app.use("/api/image", image);
app.use("/api/roles", roles);
app.use("/api/infos", infos);
app.use("/api/configs", configs);
// Direct request to auth router
app.use('/api/oauth', authRouter);
// app.use('/', authRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// For server ping
app.get("/ping", (req, res) => res.send("Server Alive"));

// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server started on port ${port}`));

server.listen(process.env.PORT || 8080, () => {
  console.log('Server listening on 8080')
})