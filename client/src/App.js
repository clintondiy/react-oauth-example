// Import Components
import React, { Component } from "react";
import OAuth from "./OAuth"

import {
  Container
} from "reactstrap"

// import io from 'socket.io-client'
// const { API_OAUTH_URL } = require('./config')
// const socket = io(API_OAUTH_URL);
const providers = ['facebook']

const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8000");

ioClient.on("seq-num", (msg) => console.info(msg));

class App extends Component {
  render() {
    return (
      <Container>
        {providers.map(provider =>
          <OAuth
            provider={provider}
            key={provider}
            socket={ioClient}
          />
        )}
      </Container>
    );
  }
}

export default App;
