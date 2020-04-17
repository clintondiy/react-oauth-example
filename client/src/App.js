// Import Components
import React, { Component } from "react";

class App extends Component {

  componentDidMount() {
    console.log('ComponentDidMount');

<<<<<<< HEAD
// const { API_OAUTH_URL } = require('./config')
// const socket = io.connect(API_OAUTH_URL);
const providers = ['facebook']

const socket = io.connect('https://localhost:8080');
socket.on("seq-num", (msg) => console.info(msg));

class App extends Component {
=======
    const io = require("socket.io-client");
    const ioClient = io.connect("https://localhost:8080", {
      secure: true,
      reconnection: true,
      rejectUnauthorized: false
    });

    ioClient.on("seq-num", (msg) => console.info('Client: ' + msg));
  }

>>>>>>> socket
  render() {
    return (
      <div></div>
    );
  }
}

export default App;
