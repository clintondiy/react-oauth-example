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

// ###### Simulate Client socket call
// Below code failed to connect if placed in client App.js
const io = require("socket.io-client");
const ioClient = io.connect("https://localhost:8080", {
    secure: true,
    reconnection: true,
    rejectUnauthorized: false
});

ioClient.on("seq-num", (msg) => console.info('Simulated client: ' + msg));
