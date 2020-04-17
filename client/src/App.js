// Import Components
import React, { Component } from "react";

const io = require("socket.io-client");
const ioClient = io.connect("https://localhost:8080", {
  secure: true,
  reconnection: true,
  rejectUnauthorized: false
});

ioClient.on("seq-num", (msg) => console.info('Client: ' + msg));

class App extends Component {
  render() {
    return (<div></div>);
  }
}
export default App;
