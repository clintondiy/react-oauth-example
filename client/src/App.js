// Import Components
import React, { Component } from "react";
import io from 'socket.io-client'
import OAuth from "./OAuth";

import {
  Container
} from "reactstrap"

//CSS
import "bootstrap/dist/css/bootstrap.min.css";

const { API_OAUTH_URL } = require('./config')
const socket = io(API_OAUTH_URL);
const providers = ['facebook']

class App extends Component {
  render() {
    return (
      <Container>
        {providers.map(provider =>
          <OAuth
            provider={provider}
            key={provider}
            socket={socket}
          />
        )}
      </Container>
    );
  }
}

export default App;
